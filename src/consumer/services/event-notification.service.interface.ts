import { EventEntity } from '../../common';
import { Observable } from 'rxjs';

export interface EventNotificationServiceInterface {
    /**
     * Method for sending notifications about event to subscribers
     * @param event
     */
    notifySubscribers(event: EventEntity): Promise<Observable<any>[]>;
}
