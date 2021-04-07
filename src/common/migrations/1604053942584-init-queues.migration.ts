import { MigrationInterface } from 'typeorm';
import { createDelayedQueue, createQueueChannel } from '../migration-helpers';

// noinspection JSUnusedGlobalSymbols
export class InitQueuesMigration1604053942584 implements MigrationInterface {

    public async up(): Promise<void> {
        const channel = await createQueueChannel(String(process.env.RABBITMQ_URL));
        await createDelayedQueue(channel, String(process.env.EVENT_QUEUE_NAME));
        await createDelayedQueue(channel, String(process.env.NOTIFICATION_QUEUE_NAME));
    }

    public async down(): Promise<void> {
        // nothing to revert
    }

}
