import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from '../entities';
import { compare } from 'bcrypt';
import { AuthServiceInterface } from './auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface{
    constructor(
        @InjectRepository(SubscriberEntity)
        private readonly subscriberRepository: Repository<SubscriberEntity>,
    ) {}

    async validateHash(apiKey: string, event: string, requestHash: string): Promise<SubscriberEntity | undefined> {
        const subscriber = await this.subscriberRepository.findOneOrFail({
            where: [
                { apiKey: apiKey },
            ]
        });

        if(!subscriber) {
            return undefined;
        }

        if(await compare(JSON.stringify(event) + subscriber.apiSecret, requestHash)){
            return subscriber;
        }
    }
}
