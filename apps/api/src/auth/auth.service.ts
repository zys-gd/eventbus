import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { compare, hash } from 'bcrypt';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(SubscriberEntity)
        private readonly subscriberRepository: Repository<SubscriberEntity>,
    ) {}

    async validateHash(apiKey: string, data: EventDto, requestHash: string): Promise<any> {
        const subscriber = await this.subscriberRepository.findOneOrFail({
            where: [
                { apiKey: apiKey },
            ]
        });

        if(!subscriber) {
            return null;
        }

        const checkingHash = await hash(data, subscriber.apiSecret || '');
        if(await compare(requestHash, checkingHash)){
            return subscriber;
        }
    }
}
