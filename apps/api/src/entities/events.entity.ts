import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class EventsEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid?: string;

    @Column() name?: string;
}