import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { compare, hash, genSalt } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(SubscriberEntity)
        private readonly subscriberRepository: Repository<SubscriberEntity>,
    ) {}

    async validateHash(apiKey: string, event: string, requestHash: string): Promise<any> {
        const subscriber = await this.subscriberRepository.findOneOrFail({
            where: [
                { apiKey: apiKey },
            ]
        });

        if(!subscriber) {
            return null;
        }
        // eslint-disable-next-line no-console
        // console.log('@@@@@@', JSON.stringify(event) + subscriber.apiSecret);
        // process.exit(1);
        if(await compare(JSON.stringify(event) + subscriber.apiSecret, requestHash)){
            return subscriber;
        }
    }
}
