import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { SubscriberEntity } from './subscriber.entity';

@Entity()
export class EventLogEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    deliveryDatetime?: Date;

    @Column()
    tries?: number;

    @OneToOne(() => EventEntity)
    @JoinColumn()
    event?: EventEntity;

    @OneToOne(() => SubscriberEntity)
    @JoinColumn()
    subscriber?: SubscriberEntity;
}
