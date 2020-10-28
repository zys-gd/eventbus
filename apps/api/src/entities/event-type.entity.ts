import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class EventTypeEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid?: string;

    @Column() name?: string;
}