import { MigrationInterface } from 'typeorm';
import {
    createSubscriber,
    deleteSubscriber,
    createEventType,
    deleteEventType,
} from '../migration-helpers';

const SUBSCRIBER_NAME = 'b2c.core';
const TICKET_EVENT_TYPE = 'b2c.ticket.update';

// noinspection JSUnusedGlobalSymbols
export class B2cSubscriberMigration1617016794685 implements MigrationInterface {

    public async up(): Promise<void> {
        await Promise.all([
            createSubscriber(SUBSCRIBER_NAME),
            createEventType(TICKET_EVENT_TYPE),
        ]);
    }

    public async down(): Promise<void> {
        await Promise.all([
            deleteSubscriber(SUBSCRIBER_NAME),
            deleteEventType(TICKET_EVENT_TYPE),
        ]);
    }
}
