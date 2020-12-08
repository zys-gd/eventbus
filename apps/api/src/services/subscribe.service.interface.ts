import { SubscribeDto } from '../dto';
import { SubscriberEntity, SubscriptionEntity } from '../entities';

export interface SubscribeServiceInterface {
    subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<SubscriptionEntity>;

    unsubscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<boolean>;
}
