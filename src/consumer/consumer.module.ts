import { HttpModule, Module } from '@nestjs/common';
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
    ],
})
export class ConsumerModule {
}
