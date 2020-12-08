import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController, SubscribeController } from './controllers';
import { AuthService, EventService, SubscribeService } from './services';
import { EventEntity, EventLogEntity, EventTypeEntity, SubscriberEntity, SubscriptionEntity } from './entities';
import { HashStrategy } from './strategies';

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
            logging: true,
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
        ClientsModule.register([
            {
                name: 'EVENT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [String(process.env.RABBITMQ_CONNECTION)],
                    queue: process.env.QUEUE_NAME || '',
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ])
    ],
    controllers: [
        EventController,
        SubscribeController,
    ],
    providers: [
        EventService,
        SubscribeService,
        AuthService,
        HashStrategy
    ],
    exports: [],
})

export class AppModule {
}
