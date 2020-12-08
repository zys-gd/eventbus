import { EventEntity } from '../../common/entities';

export interface EventNotificationServiceInterface {
    /**
     * Method for sending notifications about event to subscribers
     * @param event
     */
    notifySubscribers(event: EventEntity): Promise<void>;
}
