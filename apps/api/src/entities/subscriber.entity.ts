import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {SubscriptionEntity} from "./subscription.entity";

@Entity()
export class SubscriberEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid?: string;

    @Column() subscriber?: string;

    @Column() apiKey?: string;

    @Column() apiSecret?: string;

    @Column() active?: boolean;

    @OneToMany(() => SubscriptionEntity, subscriptions => subscriptions.eventType)
    subscriptions?: SubscriptionEntity[];
}
