import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { Exclude } from 'class-transformer';

@Entity('subscribers')
export class SubscriberEntity {

    @PrimaryColumn('uuid')
    uuid?: string;

    @Column()
    subscriber?: string;

    @Column()
    apiKey?: string;

    @Column()
    @Exclude()
    apiSecret?: string;

    @Column()
    @Exclude()
    active?: boolean;

    @OneToMany(() => SubscriptionEntity, subscriptions => subscriptions.eventType)
    subscriptions?: SubscriptionEntity[];
}
