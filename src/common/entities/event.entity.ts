import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';

@Entity('events')
export class EventEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'simple-json' })
    // eslint-disable-next-line @typescript-eslint/ban-types
    data?: number | string | object;

    @Column({ type: 'datetime' })
    createdDatetime?: Date;

    @ManyToOne(() => EventTypeEntity)
    @JoinColumn({ name: 'event_type_id' })
    eventType?: EventTypeEntity;
}
