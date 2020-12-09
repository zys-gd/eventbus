import { HttpModule, Logger, Module } from '@nestjs/common';
import { CommonModule, NOTIFICATION_SERVICE } from '../common';
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
        EventNotificationService,
        Logger,
    ],
})
export class ConsumerModule {
}
