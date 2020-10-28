import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class SubscriptionsEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid?: string;
}