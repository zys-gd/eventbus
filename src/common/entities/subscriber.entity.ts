import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';

@Entity('subscribers')
export class SubscriberEntity {

    @PrimaryColumn('uuid')
    uuid?: string;

    @Column()
    subscriber?: string;

    @Column()
    apiKey?: string;

    @Column()
    apiSecret?: string;

    @Column()
    active?: boolean;

    @OneToMany(() => SubscriptionEntity, subscription => subscription.subscriber)
    subscriptions?: SubscriptionEntity[];
}
