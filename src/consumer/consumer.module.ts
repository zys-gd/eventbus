import { HttpModule, Logger, Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { ConsumerController } from './controllers';
import { EventNotificationService } from './services';

@Module({
    imports: [
        CommonModule,
        HttpModule
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
