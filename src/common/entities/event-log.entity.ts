import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { SubscriberEntity } from './subscriber.entity';

@Entity('event_log')
export class EventLogEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'datetime', nullable: true, default: null })
    deliveryDatetime?: Date;

    @Column()
    tries?: number;

    @OneToOne(() => EventEntity)
    @JoinColumn({ name: 'event_id' })
    event?: EventEntity;

    @OneToOne(() => SubscriberEntity)
    @JoinColumn({ name: 'subscriber_id' })
    subscriber?: SubscriberEntity;
}
