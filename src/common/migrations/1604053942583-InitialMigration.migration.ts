import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class InitialMigration1604053942583 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    name: 'uuid',
                    type: 'char',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'subscriber',
                    type: 'varchar',
                    length: '45',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'api_key',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'api_secret',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'active',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
            ],
            name: 'subscribers',
        }));

        await queryRunner.createTable(new Table({
            columns: [
                {
                    name: 'uuid',
                    type: 'char',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '45',
                    isUnique: true,
                    isNullable: false,
                },
            ],
            name: 'event_types',
        }));

        await queryRunner.createTable(new Table({
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    generationStrategy: 'increment',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'event_type_id',
                    type: 'varchar',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'data',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'created_datetime',
                    type: 'datetime',
                    default: 'NOW()',
                    isNullable: false,
                },
            ],
            name: 'events',
        }));

        await queryRunner.createTable(new Table({
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    generationStrategy: 'increment',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'subscriber_id',
                    type: 'varchar',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'event_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'delivery_datetime',
                    type: 'datetime',
                    default: null,
                    isNullable: true,
                },
                {
                    name: 'tries',
                    type: 'int',
                    isNullable: false,
                },
            ],
            name: 'event_log',
        }));

        await queryRunner.createTable(new Table({
            columns: [
                {
                    name: 'uuid',
                    type: 'char',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'event_type_id',
                    type: 'char',
                    length: '36',
                },
                {
                    name: 'subscriber_id',
                    type: 'char',
                    length: '36',
                },
                {
                    name: 'notification_url',
                    type: 'char',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'created_datetime',
                    type: 'datetime',
                    default: 'NOW()',
                    isNullable: false,
                },
            ],
            name: 'subscriptions',
        }));

        await queryRunner.createForeignKey('subscriptions', new TableForeignKey({
            columnNames: ['event_type_id'],
            referencedColumnNames: ['uuid'],
            referencedTableName: 'event_types',
        }));
        await queryRunner.createForeignKey('subscriptions', new TableForeignKey({
            columnNames: ['subscriber_id'],
            referencedColumnNames: ['uuid'],
            referencedTableName: 'subscribers',
        }));

        await queryRunner.createForeignKey('event_log', new TableForeignKey({
            columnNames: ['subscriber_id'],
            referencedColumnNames: ['uuid'],
            referencedTableName: 'subscribers',
        }));
        await queryRunner.createForeignKey('event_log', new TableForeignKey({
            columnNames: ['event_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'events',
        }));

        await queryRunner.createForeignKey('events', new TableForeignKey({
            columnNames: ['event_type_id'],
            referencedColumnNames: ['uuid'],
            referencedTableName: 'event_types',
        }));

        await queryRunner.createIndex('subscriptions', new TableIndex({ columnNames: ['event_type_id', 'subscriber_id'] }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('subscriptions');
        await queryRunner.dropTable('event_log');
        await queryRunner.dropTable('events');
        await queryRunner.dropTable('event_types');
        await queryRunner.dropTable('subscribers');
    }

}
