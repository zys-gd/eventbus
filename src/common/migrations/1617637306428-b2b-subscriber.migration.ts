import { MigrationInterface } from 'typeorm';
import {
    createSubscriber,
    deleteSubscriber,
    createEventType,
    deleteEventType,
} from '../migration-helpers';

const SUBSCRIBER_NAME = 'b2b.transporter';
const TICKET_EVENT_TYPE = 'b2b.ticket.update';
const DRIVER_EVENT_TYPE = 'b2b.driver.update';

// noinspection JSUnusedGlobalSymbols
export class B2bSubscriberMigration1617637306428 implements MigrationInterface {

    public async up(): Promise<void> {
        await Promise.all([
            createSubscriber(SUBSCRIBER_NAME),
            createEventType(TICKET_EVENT_TYPE),
            createEventType(DRIVER_EVENT_TYPE),
        ]);
    }

    public async down(): Promise<void> {
        await Promise.all([
            deleteSubscriber(SUBSCRIBER_NAME),
            deleteEventType(TICKET_EVENT_TYPE),
            deleteEventType(DRIVER_EVENT_TYPE),
        ]);
    }
}
