import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventbusConstants, EventEntity } from '../../common';
import { EventNotificationService } from '../services';

@Controller()
export class ConsumerController {
    constructor(
        private readonly eventNotificationService: EventNotificationService,
    ) {}

    @EventPattern(EventbusConstants.QUEUE_PATTERN)
    public async notifyAction(@Payload() eventEntity: EventEntity, @Ctx() context: RmqContext) {
        context.getChannelRef().ack(context.getMessage());
        await this.eventNotificationService.notifySubscribers(eventEntity);
    }
}
