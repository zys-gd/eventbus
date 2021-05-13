import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule, EVENT_SERVICE } from '../common';
import { EventController, SubscribeController } from './controllers';
import { AuthService, EventService, SubscribeService } from './services';
import { HashStrategy, TokenStrategy } from './strategies';

@Module({
    imports: [
        CommonModule,
        ClientsModule.register([
            {
                name: EVENT_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [String(process.env.RABBITMQ_URL)],
                    queue: process.env.EVENT_QUEUE_NAME || '',
                    noAck: false,
                    persistent: true,
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
            provide: 'EventService',
            useClass: EventService,
        },
        {
            provide: 'SubscribeService',
            useClass: SubscribeService,
        },
        {
            provide: 'AuthService',
            useClass: AuthService,
        },
        HashStrategy,
        TokenStrategy,
    ],
    exports: [],
})

export class ApiModule {
}
