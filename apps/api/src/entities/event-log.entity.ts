import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class EventLogEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid?: string;

    @Column() name?: string;
}