import { getConnection } from 'typeorm';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { EventTypeEntity } from '../entities';

export function createEventType (name: string): Promise<InsertResult> {
    return getConnection()
        .createQueryBuilder()
        .insert()
        .into(EventTypeEntity)
        .values({ name })
        .execute();
}

export function deleteEventType (name: string): Promise<DeleteResult> {
    return getConnection()
        .createQueryBuilder()
        .delete()
        .from(EventTypeEntity)
        .where('name = :name', { name })
        .execute();
}
