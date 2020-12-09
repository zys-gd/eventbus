import { EventEntity, SubscriberEntity } from '../../common';
import { NotificationDtoInterface } from './notification.dto.interface';

export class NotificationDto implements NotificationDtoInterface {
    constructor(
        public readonly event: EventEntity,
        public readonly tries: number,
        public readonly subscriber?: SubscriberEntity,
    ) {
    }
}
