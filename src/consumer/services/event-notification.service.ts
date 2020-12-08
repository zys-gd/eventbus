import { HttpService } from '@nestjs/common';
import { EventNotificationServiceInterface } from './event-notification.service.interface';
import { EventEntity, SubscriptionEntity } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';

export class EventNotificationService implements EventNotificationServiceInterface {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,
        private httpService: HttpService
    ) {
    }

    public async notifySubscribers(event: EventEntity): Promise<Observable<any>[]> {
        const subscriptions: SubscriptionEntity[] = await this.subscriptionEntityRepository.find({
            where: [
                { eventType: event.eventType },
            ]
        });
        return await Promise.all(
            subscriptions.map(
                (subscription) => this.httpService.post(
                    subscription.notificationUrl || '',
                    event.data,
                ),
            ),
        );
    }

}
