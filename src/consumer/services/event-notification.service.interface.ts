import { EventEntity, EventLogEntity } from '../../common';
import { NotificationDto } from '../dto/notification.dto';

export interface EventNotificationServiceInterface {
    /**
     * Method for sending notifications about event to subscribers
     * @param event
     */
    processEvent(event: EventEntity): Promise<Array<void>>;

    /**
     * Method for sending notification about event to subscriber
     * @param notificationDto
     */
    processNotification(notificationDto: NotificationDto): Promise<EventLogEntity | void>;
}
