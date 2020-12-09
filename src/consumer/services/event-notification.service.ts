import { HttpService, Inject, Logger } from '@nestjs/common';
import { EventNotificationServiceInterface } from './event-notification.service.interface';
import { EventbusConstants, EventEntity, EventLogEntity, SubscriptionEntity } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';

export class EventNotificationService implements EventNotificationServiceInterface {
    private NOTIFICATION_TRIES_DEFAULT = 3;

    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,
        @InjectRepository(EventLogEntity)
        private readonly eventLogEntityRepository: Repository<EventLogEntity>,
        private readonly httpService: HttpService,
        private readonly logger: Logger,
        @Inject(EventbusConstants.NOTIFICATION_SERVICE)
        private readonly client: ClientProxy,
    ) {
    }

    public async processEvent(event: EventEntity): Promise<Array<void>> {
        const subscriptions: SubscriptionEntity[] = await this.subscriptionEntityRepository.find({
            relations: ['subscriber'],
            where: [
                { eventType: event.eventType },
            ]
        });

        return await Promise.all(
            subscriptions.map(
                async (subscription: SubscriptionEntity) => {
                    await this.notifySubscriber(event, subscription);
                }
            ),
        );
    }

    public async processNotification(notificationDto: NotificationDto): Promise<void> {
        const subscription: SubscriptionEntity = await this.subscriptionEntityRepository.findOneOrFail({
            relations: ['subscriber'],
            where: [
                {
                    eventType: notificationDto.event.eventType,
                    subscriber: notificationDto.subscriber
                },
            ]
        });
        if (notificationDto.tries < (process.env.NOTIFICATION_TRIES || this.NOTIFICATION_TRIES_DEFAULT)) {
            await this.notifySubscriber(notificationDto.event, subscription, notificationDto.tries + 1);
        }
    }

    private async notifySubscriber(event: EventEntity, subscription: SubscriptionEntity, tries = 1): Promise<void> {
        let eventLog: EventLogEntity;
        try {
            eventLog = await this.eventLogEntityRepository.findOneOrFail({
                where: [
                    { subscriber: subscription.subscriber, event },
                ]
            });
            if (typeof eventLog.tries === 'undefined') {
                eventLog.tries = 0;
            }
            eventLog.tries++;
        } catch (e) {
            eventLog = new EventLogEntity();
            eventLog.subscriber = subscription.subscriber;
            eventLog.event = event;
            eventLog.tries = 1;
        }

        try {
            const response = await (this.httpService.post(
                subscription.notificationUrl || '',
                event.data,
            )).toPromise();

            if (response.status === 200) {
                eventLog.deliveryDatetime = new Date();
                await this.eventLogEntityRepository.save(eventLog);
            } else {
                this.client.emit<number>(EventbusConstants.NOTIFICATION_QUEUE_PATTERN, new NotificationDto(event, tries, subscription.subscriber));
            }
        } catch (e) {
            await this.eventLogEntityRepository.save(eventLog);
            this.client.emit<number>(EventbusConstants.NOTIFICATION_QUEUE_PATTERN, new NotificationDto(event, tries, subscription.subscriber));
        }
    }
}
