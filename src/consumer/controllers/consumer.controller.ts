import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventEntity } from '../../common/entities';
import { EventNotificationService } from '../services';
import { EventbusConstants } from '../../common/eventbus-constants';

@Controller()
export class ConsumerController {
    constructor(
        private readonly eventNotificationService: EventNotificationService,
    ) {}

    @EventPattern(EventbusConstants.QUEUE_PATTERN)
    public async getNotifications(@Payload() eventEntity: EventEntity, @Ctx() context: RmqContext) {
        context.getChannelRef().ack(context.getMessage());
        await this.eventNotificationService.notifySubscribers(eventEntity);
    }
}
