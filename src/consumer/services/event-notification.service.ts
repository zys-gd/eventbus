import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { EventNotificationServiceInterface } from './event-notification.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';
import {
    EVENTBUS_LOGGER,
    EventEntity,
    EventLogEntity,
    NOTIFICATION_QUEUE_PATTERN,
    NOTIFICATION_SERVICE,
    SubscriptionEntity,
} from '../../common';

@Injectable()
export class EventNotificationService implements EventNotificationServiceInterface {

    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,
        @InjectRepository(EventLogEntity)
        private readonly eventLogEntityRepository: Repository<EventLogEntity>,
        private readonly httpService: HttpService,
        @Inject(EVENTBUS_LOGGER)
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

        return this.notifySubscriber(notificationDto.event, subscription, notificationDto.tries);
    }

    /**
     * @param event
     * @param subscription
     * @param tries
     * @private
     */
    private async notifySubscriber(event: EventEntity, subscription: SubscriptionEntity, tries = 0): Promise<EventLogEntity> {
        this.logger.debug('Starting EventNotificationService::notifySubscriber');
        this.logger.debug('EventEntity: %s', JSON.stringify(event));
        this.logger.debug('SubscriptionEntity: %s', JSON.stringify(subscription));

        let eventLog: EventLogEntity;

        try {
            eventLog = await this.eventLogEntityRepository.findOneOrFail({
                where: [
                    { subscriber: subscription.subscriber, event },
                ]
            });
            eventLog.tries = tries;
        } catch (e) {
            eventLog = new EventLogEntity();
            eventLog.subscriber = subscription.subscriber;
            eventLog.event = event;
            eventLog.tries = 1;
        }

        const notificationDto: NotificationDto = new NotificationDto(event, tries + 1, subscription.subscriber);

        try {
            const response = await (this.httpService.post(
                subscription.notificationUrl || '',
                event.data,
            )).toPromise();

            if (response.status === 200) {
                eventLog.deliveryDatetime = new Date();

                this.logger.debug('EventNotificationService::notifySubscriber: Success sending request to subscriber.');
                return this.eventLogEntityRepository.save(eventLog);
            }
            this.logger.debug('EventNotificationService::notifySubscriber: Wrong HTTP code while sending request to subscriber.');
        } catch (e) {
            this.logger.debug(
                'EventNotificationService::notifySubscriber: Error while sending request to subscriber. HTTP code: "%s", HTTP status: "%s"',
                e.response ? e.response.status : undefined,
                e.response ? e.response.statusText : undefined,
            );
        }
        await this.pushNotification2Queue(notificationDto);
        return this.eventLogEntityRepository.save(eventLog);
    }

    /**
     * @param notificationDto
     * @private
     */
    private async pushNotification2Queue(notificationDto: NotificationDto): Promise<void> {
        this.client.emit<number>(NOTIFICATION_QUEUE_PATTERN, notificationDto);
    }
}
