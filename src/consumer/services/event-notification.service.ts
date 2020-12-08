import { EventNotificationServiceInterface } from './event-notification.service.interface';
import { EventEntity, SubscriptionEntity } from '../../common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/common';

export class EventNotificationService implements EventNotificationServiceInterface {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,

        private httpService: HttpService
    ) {}

    public async notifySubscribers(event: EventEntity): Promise<void> {
        const subscriptions: SubscriptionEntity[] = await this.subscriptionEntityRepository.find({
            where: [
                { eventType: event.eventType },
            ]
        });
        for (const subscription of subscriptions) {
            await this.httpService.post(subscription.notificationUrl || '', event.data);
        }
    }

}
