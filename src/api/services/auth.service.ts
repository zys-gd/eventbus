import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from '../../common';
import { AuthServiceInterface } from './auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @InjectRepository(SubscriberEntity)
        private readonly subscriberRepository: Repository<SubscriberEntity>,
    ) {
    }

    async validateHash(apiKey: string, event: string, requestHash: string): Promise<SubscriberEntity | undefined> {
        const subscriber = await this.getSubscriberByApiKey(apiKey);

        if (!subscriber) {
            return undefined;
        }

        if (await compare(JSON.stringify(event) + subscriber.apiSecret, requestHash)) {
            return subscriber;
        }
    }

    async validateApiKey(apiKey: string, requestHash: string): Promise<SubscriberEntity | undefined> {
        const subscriber = await this.getSubscriberByApiKey(apiKey);

        if (!subscriber) {
            return undefined;
        }

        if (await compare(apiKey + subscriber.apiSecret, requestHash)) {
            return subscriber;
        }
    }

    private async getSubscriberByApiKey(apiKey: string): Promise<SubscriberEntity | undefined> {
        return await this.subscriberRepository.findOneOrFail({
            where: [
                { apiKey },
            ]
        });
    }
}
