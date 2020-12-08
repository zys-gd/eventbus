import { EventEntity } from '../../common/entities';

export interface EventNotificationServiceInterface {
    notifySubscribers(event: EventEntity): Promise<any>;
}
