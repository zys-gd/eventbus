import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EVENT_QUEUE_PATTERN, EventEntity, NOTIFICATION_QUEUE_PATTERN } from '../../common';
import { NotificationDto } from '../dto/notification.dto';
import { EventNotificationServiceInterface } from '../services/event-notification.service.interface';

@Controller()
export class ConsumerController {
    constructor(
        @Inject('EventNotificationServiceInterface')
        private readonly eventNotificationService: EventNotificationServiceInterface,
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
