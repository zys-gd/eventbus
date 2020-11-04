import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';

@Entity()
export class EventTypeEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid?: string;

    @Column() name?: string;

    @OneToMany(() => SubscriptionEntity, subscriptions => subscriptions.eventType)
    subscriptions?: SubscriptionEntity[];
}
