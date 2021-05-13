import { getConnection } from 'typeorm';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { SubscriberEntity } from '../entities';

export function createSubscriber (subscriber: string, active = true): Promise<InsertResult> {
    const MY_NAMESPACE = uuidv4();
    return getConnection()
        .createQueryBuilder()
        .insert()
        .into(SubscriberEntity)
        .values({
            subscriber,
            apiKey: uuidv5('apiKey', MY_NAMESPACE),
            apiSecret: uuidv5('apiSecret', MY_NAMESPACE),
            apiSubscribeSecret: uuidv5('apiSubscribeSecret', MY_NAMESPACE),
            active,
        }).execute();
}

export function deleteSubscriber (subscriber: string): Promise<DeleteResult> {
    return getConnection()
        .createQueryBuilder()
        .delete()
        .from(SubscriberEntity)
        .where('subscriber = :subscriber', { subscriber })
        .execute();
}
