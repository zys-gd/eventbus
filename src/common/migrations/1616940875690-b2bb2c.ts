import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class b2bb2c1616940875690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO eventbus.subscribers\n' +
            '(uuid, subscriber, api_key, api_secret, active)\n' +
            'VALUES(\'0x0FCE1B7E50284E3B90DD113A2D963DAA\', \'/api/subscriber/ticket/update\', \'apiKey\', \'secret_token\', 1);\n');

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM eventbus.subscribers\n' +
            'where id = \'0x0FCE1B7E50284E3B90DD113A2D963DAA\'');

    }

}
