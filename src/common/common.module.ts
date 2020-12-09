import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import {
    EventEntity,
    EventLogEntity,
    EventTypeEntity,
    SubscriberEntity,
    SubscriptionEntity,
} from './entities';

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
            synchronize: false,
            logging: false,
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
    ],
})

export class CommonModule {
}
