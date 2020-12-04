import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './controllers/event.controller';
import { SubscribeController } from './controllers/subscribe.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            debug: true,
            synchronize: false,
            entities: [
                __dirname + '/entities/*entity.js'
            ],
            migrations: [
                __dirname + '/migrations/*.js'
            ],
        }),
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
        AuthModule,
    ],
    controllers: [
        EventController,
        SubscribeController,
    ],
    providers: [],
    exports: [],
})

export class AppModule {
}
