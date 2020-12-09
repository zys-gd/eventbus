import { EventEntity, SubscriberEntity } from '../../common';

export interface NotificationDtoInterface {
    readonly event: EventEntity,
    readonly tries: number,
    readonly subscriber?: SubscriberEntity,
}
