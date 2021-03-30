import { MigrationInterface, QueryRunner } from 'typeorm';
import { createSubscriber, deleteSubscriber } from '../migration-helpers';

const SUBSCRIBER_NAME = 'b2b.transporter';

export class b2bSuscriber1617104575110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await createSubscriber(SUBSCRIBER_NAME);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await deleteSubscriber(SUBSCRIBER_NAME);

    }

}
