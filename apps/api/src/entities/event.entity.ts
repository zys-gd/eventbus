import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';

@Entity('events')
export class EventEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    data?: string;

    @Column({ type: 'date' })
    createdDatetime?: Date;

    @OneToOne(() => EventTypeEntity)
    @JoinColumn({ name: 'event_type_id' })
    eventType?: EventTypeEntity;
}
