import { HttpModule, Module } from '@nestjs/common';
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
                    urls: [String(process.env.RABBITMQ_URL)],
                    queue: process.env.NOTIFICATION_QUEUE_NAME || '',
                    noAck: false,
                    persistent: true,
                },
            },
        ])
    ],
    controllers: [
        ConsumerController
    ],
    providers: [
        {
            provide: 'EventNotificationService',
            useClass: EventNotificationService,
        },
    ],
})
export class ConsumerModule {
}
