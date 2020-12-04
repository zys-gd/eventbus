import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { compare, hash } from 'bcrypt';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class AuthService {

    async validateHash(apiKey: string, data: EventDto, requestHash: string): Promise<any> {
        const subscriberRepository = getRepository(SubscriberEntity);
        const subscriber = await subscriberRepository.findOneOrFail({
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
