import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from '../common';
import { EventController, SubscribeController } from './controllers';
import { AuthService, EventService, SubscribeService } from './services';
import { HashStrategy } from './strategies';

@Module({
    imports: [
        CommonModule,
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

export class ApiModule {
}
