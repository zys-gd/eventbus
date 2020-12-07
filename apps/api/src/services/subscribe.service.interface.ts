import { SubscribeDto } from '../dto/subscribe.dto';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { SubscriptionEntity } from '../entities/subscription.entity';

export interface SubscribeServiceInterface {
    subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<SubscriptionEntity>;

    unsubscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): any;
}