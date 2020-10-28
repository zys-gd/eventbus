import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {EventTypeEntity} from "./event-type.entity";

@Entity()
export class EventEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column() data?: string;

    @Column() createdDatetime?: Date;

    @OneToOne(() => EventTypeEntity)
    @JoinColumn()
    eventType?: EventTypeEntity;
}