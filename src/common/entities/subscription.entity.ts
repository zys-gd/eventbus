import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';
import { SubscriberEntity } from './subscriber.entity';

@Entity('subscriptions')
@Unique('UNIQ_INDEX_ES', ['eventType', 'subscriber'])
export class SubscriptionEntity {

    @PrimaryColumn('uuid')
    uuid?: string;

    @Column()
    notificationUrl?: string;

    @Column({ type: 'datetime' })
    createdDatetime?: Date;

    @ManyToOne(() => EventTypeEntity)
    @JoinColumn({ name: 'event_type_id' })
    eventType?: EventTypeEntity;

    @ManyToOne(() => SubscriberEntity, subscriber => subscriber.subscriptions)
    @JoinColumn({ name: 'subscriber_id' })
    subscriber?: SubscriberEntity;
}
