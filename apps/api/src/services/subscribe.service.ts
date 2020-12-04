import { Injectable } from '@nestjs/common';
import { SubscribeDto } from '../dto/subscribe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { v4 as uuid, v4 } from 'uuid';
import { SubscriberEntity } from '../entities/subscriber.entity';

@Injectable()
export class SubscribeService {

    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionEntityRepository: Repository<SubscriptionEntity>,
    ) {}

    public subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity) {
        this.subscriptionEntityRepository.save({ uuid: v4() });
        return true;
    }

    public unsubscribe(subscribeDto: SubscribeDto) {
        return true;
    }
}
