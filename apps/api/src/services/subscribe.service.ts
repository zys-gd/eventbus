import { Injectable } from '@nestjs/common';
import { SubscribeDto } from '../dto/subscribe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { v4 as uuid } from 'uuid';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { SubscribeServiceInterface } from './subscribe.service.interface';
import { EventTypeEntity } from '../entities/event-type.entity';
import { UnsubscribeDto } from '../dto/unsubscribe.dto';

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

        const existingSubscription: SubscriptionEntity = await this.subscriptionEntityRepository.findOneOrFail({
            where: [
                {
                  eventType: eventType,
                  subscriber: subscriber,
                },
            ]
        });
        if(existingSubscription) {
            throw new Error('Subscription already exists');
        }

        const subscription: SubscriptionEntity = new SubscriptionEntity();
        subscription.uuid = uuid();
        subscription.notificationUrl = subscribeDto.notificationUrl;
        subscription.eventType = eventType;
        subscription.subscriber = subscriber;
        await this.subscriptionEntityRepository.save(subscription);

        return subscription;
    }

    public async unsubscribe(unsubscribeDto: UnsubscribeDto, subscriber: SubscriberEntity): Promise<boolean> {
        const eventType: EventTypeEntity = await this.eventTypeEntityRepository.findOneOrFail({
            where: [
                { name: unsubscribeDto.eventType },
            ]
        });
        await this.subscriptionEntityRepository.delete({
            eventType: eventType,
            subscriber: subscriber
        });

        return true;
    }
}
