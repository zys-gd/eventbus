import { Module } from '@nestjs/common';
import { Logger, createLogger, transports as LoggerTransports, format as LoggerFormat } from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EventEntity, EventLogEntity, EventTypeEntity, SubscriberEntity, SubscriptionEntity, } from './entities';
import { EVENTBUS_LOGGER } from './eventbus-constants';

const eventbusLogger = {
    provide: EVENTBUS_LOGGER,
    useFactory: (): Logger => {
        return createLogger({
            level: 'silly',
            format: LoggerFormat.combine(
                LoggerFormat.splat(),
                LoggerFormat.simple()
            ),
            transports: [
                new LoggerTransports.Console(),
            ]
        });
    },
};

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            debug: process.env.MYSQL_DEBUG === 'true' ? ['ComQueryPacket'] : false,
            migrationsRun: process.env.MIGRATION_RUN === 'true',
            synchronize: false,
            namingStrategy: new SnakeNamingStrategy(),
            entities: [
                __dirname + '/entities/*.entity.js'
            ],
            migrations: [
                __dirname + '/migrations/*.js'
            ],
        }),
        TypeOrmModule.forFeature([
            SubscriptionEntity,
            SubscriberEntity,
            EventTypeEntity,
            EventEntity,
            EventLogEntity
        ]),
    ],
    exports: [
        TypeOrmModule,
        eventbusLogger,
    ],
    providers: [
        eventbusLogger,
    ],
})

export class CommonModule {
}
