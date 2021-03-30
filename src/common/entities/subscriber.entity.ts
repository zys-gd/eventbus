import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';

@Entity('subscribers')
export class SubscriberEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    subscriber?: string;

    @Column()
    apiKey?: string;

    @Column()
    apiSecret?: string;

    @Column()
    apiSubscribeSecret?: string;

    @Column()
    active?: boolean;

    @OneToMany(() => SubscriptionEntity, subscription => subscription.subscriber)
    subscriptions?: SubscriptionEntity[];
}
