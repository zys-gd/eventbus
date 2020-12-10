import { HttpModule, Logger, Module } from '@nestjs/common';
import { CommonModule, EVENTBUS_LOGGER, NOTIFICATION_SERVICE } from '../common';
import * as winston from 'winston';
import { format } from 'winston';
import { ConsumerController } from './controllers';
import { EventNotificationService } from './services';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        CommonModule,
        HttpModule,
        ClientsModule.register([
            {
                name: NOTIFICATION_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [String(process.env.RABBITMQ_CONNECTION)],
                    queue: process.env.NOTIFICATION_QUEUE_NAME || '',
                    noAck: false,
                    queueOptions: {
                        durable: true
                    },
                },
            },
        ])
    ],
    controllers: [
        ConsumerController
    ],
    providers: [
        Logger,
        {
            provide: 'EventNotificationServiceInterface',
            useClass: EventNotificationService,
        },
        {
            provide: EVENTBUS_LOGGER,
            useFactory: (): winston.Logger => {
                return winston.createLogger({
                    level: 'silly',
                    format: format.combine(
                        format.splat(),
                        format.simple()
                    ),
                    transports: [
                        new winston.transports.Console(),
                    ]
                });
            },
        },
    ],
})
export class ConsumerModule {
}
