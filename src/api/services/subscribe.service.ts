import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SubscribeDto } from '../dto';
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
    ) {
    }

    public async subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<SubscriptionEntity> {
        const eventType: EventTypeEntity = await this.eventTypeEntityRepository.findOneOrFail({
            where: [
                { name: subscribeDto.eventType },
            ]
        });

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

        const subscription: SubscriptionEntity = new SubscriptionEntity();
        subscription.uuid = uuid();
        subscription.notificationUrl = subscribeDto.notificationUrl;
        subscription.eventType = eventType;
        subscription.subscriber = subscriber;

        return this.subscriptionEntityRepository.save(subscription);
    }

    public async unsubscribe(eventType: string, subscriber: SubscriberEntity): Promise<void> {
        const eventTypeEntity: EventTypeEntity = await this.eventTypeEntityRepository.findOneOrFail({
            where: [
                { name: eventType },
            ]
        });
        const res = await this.subscriptionEntityRepository.delete({
            eventType: eventTypeEntity,
            subscriber: subscriber
        });

        if (res.affected === 0) {
            throw new Error();
        }
    }
}
