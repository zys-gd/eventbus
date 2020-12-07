import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './controllers/event.controller';
import { SubscribeController } from './controllers/subscribe.controller';
import { EventService, SubscribeService } from './services';
import { AuthService } from './services/auth.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriberEntity } from './entities/subscriber.entity';
import { EventTypeEntity } from './entities/event-type.entity';
import { EventEntity } from './entities/event.entity';
import { HashStrategy } from './strategies/hash.strategy';

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
            EventEntity
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
        ]),
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
