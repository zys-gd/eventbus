import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';
import { SubscriberEntity } from './subscriber.entity';

@Entity()
export class SubscriptionEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid?: string;

    @Column() notificationUrl?: string;

    @Column() createdDatetime?: Date;

    @ManyToOne(() => EventTypeEntity, eventTypeEntity => eventTypeEntity.subscriptions)
    eventType?: EventTypeEntity;

    @ManyToOne(() => SubscriberEntity, subscriber => subscriber.subscriptions)
    subscriber?: SubscriberEntity;
}
