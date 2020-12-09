import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SubscribeDto, UnsubscribeDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventTypeEntity, SubscriberEntity, SubscriptionEntity } from '../../common';
import { SubscribeServiceInterface } from './subscribe.service.interface';

@Injectable()
export class SubscribeService implements SubscribeServiceInterface {

    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,

        @InjectRepository(EventTypeEntity)
        private readonly eventTypeEntityRepository: Repository<EventTypeEntity>,
    ) {}

    public async subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<SubscriptionEntity> {
        const eventType: EventTypeEntity = await this.eventTypeEntityRepository.findOneOrFail({
            where: [
                { name: subscribeDto.eventType },
            ]
        });

        try {
            const existingSubscription: number = await this.subscriptionEntityRepository.count({
                where: [
                    {
                        eventType: eventType,
                        subscriber: subscriber,
                    },
                ]
            });

            if (existingSubscription != 0) {
                throw new Error('Subscription already exists');
            }
        } catch (e) {}

        const subscription: SubscriptionEntity = new SubscriptionEntity();
        subscription.uuid = uuid();
        subscription.notificationUrl = subscribeDto.notificationUrl;
        subscription.eventType = eventType;
        subscription.subscriber = subscriber;
        await this.subscriptionEntityRepository.save(subscription);

        return subscription;
    }

    public async unsubscribe(unsubscribeDto: UnsubscribeDto, subscriber: SubscriberEntity): Promise<void> {
        const eventType: EventTypeEntity = await this.eventTypeEntityRepository.findOneOrFail({
            where: [
                { name: unsubscribeDto.eventType },
            ]
        });
        await this.subscriptionEntityRepository.delete({
            eventType: eventType,
            subscriber: subscriber
        });
    }
}
