import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule, EVENT_SERVICE } from '../common';
import { EventController, SubscribeController } from './controllers';
import { AuthService, EventService, SubscribeService } from './services';
import { HashStrategy } from './strategies';

@Module({
    imports: [
        CommonModule,
        ClientsModule.register([
            {
                name: EVENT_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [String(process.env.RABBITMQ_CONNECTION)],
                    queue: process.env.EVENT_QUEUE_NAME || '',
                    noAck: false,
                    queueOptions: {
                        durable: true
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
        {
            provide: 'EventServiceInterface',
            useClass: EventService,
        },
        {
            provide: 'SubscribeServiceInterface',
            useClass: SubscribeService,
        },
        {
            provide: 'AuthServiceInterface',
            useClass: AuthService,
        },
        HashStrategy,
    ],
    exports: [],
})

export class ApiModule {
}
