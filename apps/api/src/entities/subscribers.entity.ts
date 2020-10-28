import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class SubscribersEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid?: string;
}