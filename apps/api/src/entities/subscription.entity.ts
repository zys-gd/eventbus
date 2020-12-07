import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';
import { SubscriberEntity } from './subscriber.entity';

@Entity('subscriptions')
export class SubscriptionEntity {

    @PrimaryColumn('uuid')
    uuid?: string;

    @Column()
    notificationUrl?: string;

    @Column({ type: 'date' })
    createdDatetime?: Date;

    @ManyToOne(() => EventTypeEntity, eventTypeEntity => eventTypeEntity.subscriptions)
    @JoinColumn({ name: 'event_type_id' })
    eventType?: EventTypeEntity;

    @ManyToOne(() => SubscriberEntity, subscriber => subscriber.subscriptions)
    @JoinColumn({ name: 'subscriber_id' })
    subscriber?: SubscriberEntity;
}
