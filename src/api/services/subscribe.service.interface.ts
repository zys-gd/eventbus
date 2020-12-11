import { SubscribeDto } from '../dto';
import { SubscriberEntity, SubscriptionEntity } from '../../common';

export interface SubscribeServiceInterface {
    /**
     * Method for creation subscription
     * @param subscribeDto
     * @param subscriber
     */
    subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<SubscriptionEntity>;

    /**
     * Method for removing subscription
     * @param eventType
     * @param subscriber
     */
    unsubscribe(eventType: string, subscriber: SubscriberEntity): Promise<void>;
}
