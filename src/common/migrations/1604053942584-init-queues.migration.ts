import { MigrationInterface } from 'typeorm';
import { createDelayedQueue, createQueueChannel } from '../migration-helpers';

// noinspection JSUnusedGlobalSymbols
export class InitQueuesMigration1604053942584 implements MigrationInterface {

    public async up(): Promise<void> {
        const channel = await createQueueChannel(String(process.env.RABBITMQ_URL));
        await Promise.all(
            [
                process.env.EVENT_QUEUE_NAME,
                process.env.NOTIFICATION_QUEUE_NAME,
            ].map(
                queueName => createDelayedQueue(channel, String(queueName)),
            )
        );
    }

    public async down(): Promise<void> {
        // nothing to revert
    }

}
