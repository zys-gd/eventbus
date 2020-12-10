import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { EventNotificationServiceInterface } from './event-notification.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';
import {
    EventEntity,
    EventLogEntity,
    NOTIFICATION_QUEUE_PATTERN,
    NOTIFICATION_SERVICE,
    SubscriptionEntity,
} from '../../common';

@Injectable()
export class EventNotificationService implements EventNotificationServiceInterface {
    private NOTIFICATION_TRIES_DEFAULT = 3;

    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,
        @InjectRepository(EventLogEntity)
        private readonly eventLogEntityRepository: Repository<EventLogEntity>,
        private readonly httpService: HttpService,
        private readonly logger: Logger,
        @Inject(NOTIFICATION_SERVICE)
        private readonly client: ClientProxy,
    ) {
    }

    /**
     * @param event
     */
    public async processEvent(event: EventEntity): Promise<(EventLogEntity | void)[]> {
        const subscriptions: SubscriptionEntity[] = await this.subscriptionEntityRepository.find({
            relations: ['subscriber'],
            where: [
                { eventType: event.eventType },
            ]
        });

        return await Promise.all(
            subscriptions.map(
                (subscription: SubscriptionEntity) => this.notifySubscriber(event, subscription)
            ),
        );
    }

    /**
     * @param notificationDto
     */
    public async processNotification(notificationDto: NotificationDto): Promise<EventLogEntity | void> {
        const subscription: SubscriptionEntity = await this.subscriptionEntityRepository.findOneOrFail({
            relations: ['subscriber'],
            where: [
                {
                    eventType: notificationDto.event.eventType,
                    subscriber: notificationDto.subscriber
                },
            ]
        });

        if (notificationDto.tries <= (process.env.NOTIFICATION_TRIES || this.NOTIFICATION_TRIES_DEFAULT)) {
            return this.notifySubscriber(notificationDto.event, subscription, notificationDto.tries);
        }
    }

    /**
     * @param event
     * @param subscription
     * @param tries
     * @private
     */
    private async notifySubscriber(event: EventEntity, subscription: SubscriptionEntity, tries = 0): Promise<EventLogEntity | void> {
        let eventLog: EventLogEntity;

        try {
            eventLog = await this.eventLogEntityRepository.findOneOrFail({
                where: [
                    { subscriber: subscription.subscriber, event },
                ]
            });
        } catch (e) {
            eventLog = new EventLogEntity();
            eventLog.subscriber = subscription.subscriber;
            eventLog.event = event;
        }

        eventLog.tries = tries;

        const notificationDto: NotificationDto = new NotificationDto(event, tries + 1, subscription.subscriber);

        try {
            const response = await (this.httpService.post(
                subscription.notificationUrl || '',
                event.data,
            )).toPromise();

            if (response.status === 200) {
                eventLog.deliveryDatetime = new Date();
                return this.eventLogEntityRepository.save(eventLog);
            }
            return this.pushNotification2Queue(notificationDto);
        } catch (e) {
            await this.eventLogEntityRepository.save(eventLog);
            return this.pushNotification2Queue(notificationDto);
        }
    }

    /**
     * @param notificationDto
     * @private
     */
    private async pushNotification2Queue(notificationDto: NotificationDto): Promise<void> {
        this.client.emit<number>(NOTIFICATION_QUEUE_PATTERN, notificationDto);
    }
}
