import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {

    async validateHash(apiKey: string, request: string, requestHash: string): Promise<any> {
        const subscriberRepository = getRepository(SubscriberEntity);
        const subscriber = await subscriberRepository.findOneOrFail({
            where: [
                { apiKey: apiKey },
            ]
        });

        if(!subscriber) {
            return null;
        }

        const checkingHash = await hash(request, String(subscriber.apiSecret));
        if(await compare(requestHash, checkingHash)){
            return subscriber;
        }
    }
}
