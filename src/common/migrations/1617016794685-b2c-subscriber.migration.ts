import { MigrationInterface } from 'typeorm';
import { createSubscriber, deleteSubscriber } from '../migration-helpers';

const SUBSCRIBER_NAME = 'b2c.core';

// noinspection JSUnusedGlobalSymbols
export class B2cSubscriberMigration1617016794685 implements MigrationInterface {

    public async up(): Promise<void> {
        await createSubscriber(SUBSCRIBER_NAME);
    }

    public async down(): Promise<void> {
        await deleteSubscriber(SUBSCRIBER_NAME);
    }
}
