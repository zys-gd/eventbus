import { HttpService, Logger } from '@nestjs/common';
import { EventNotificationServiceInterface } from './event-notification.service.interface';
import { EventEntity, EventLogEntity, SubscriptionEntity } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class EventNotificationService implements EventNotificationServiceInterface {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,
        @InjectRepository(EventLogEntity)
        private readonly eventLogEntityRepository: Repository<EventLogEntity>,
        private readonly httpService: HttpService,
        private readonly logger: Logger,
    ) {
    }

    public async notifySubscribers(event: EventEntity): Promise<Array<void>> {
        const subscriptions: SubscriptionEntity[] = await this.subscriptionEntityRepository.find({
            where: [
                { eventType: event.eventType },
            ]
        });

        return await Promise.all(
            subscriptions.map(
                async (subscription) => {
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
                        }
                    } catch (e) {
                        await this.eventLogEntityRepository.save(eventLog);
                    }

                }
            ),
        );
    }

}
