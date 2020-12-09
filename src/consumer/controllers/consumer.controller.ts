import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EVENT_QUEUE_PATTERN, EventEntity, NOTIFICATION_QUEUE_PATTERN } from '../../common';
import { EventNotificationService } from '../services';
import { NotificationDto } from '../dto/notification.dto';

@Controller()
export class ConsumerController {
    constructor(
        private readonly eventNotificationService: EventNotificationService,
    ) {}

    @EventPattern(EVENT_QUEUE_PATTERN)
    public async processingEventAction(@Payload() eventEntity: EventEntity, @Ctx() context: RmqContext) {
        await this.eventNotificationService.processEvent(eventEntity);
        context.getChannelRef().ack(context.getMessage());
    }

    @EventPattern(NOTIFICATION_QUEUE_PATTERN)
    public async notifyAction(@Payload() notificationDto: NotificationDto, @Ctx() context: RmqContext) {
        await this.eventNotificationService.processNotification(notificationDto);
        context.getChannelRef().ack(context.getMessage());
    }
}
