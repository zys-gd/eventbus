import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
    EVENT_QUEUE_PATTERN,
    EVENTBUS_LOGGER,
    EventEntity,
    NOTIFICATION_QUEUE_PATTERN,
    NOTIFICATION_TRIES_DEFAULT
} from '../../common';
import winston from 'winston';
import { NotificationDto } from '../dto/notification.dto';
import { EventNotificationServiceInterface } from '../services/event-notification.service.interface';

@Controller()
export class ConsumerController {
    constructor(
        @Inject('EventNotificationService')
        private readonly eventNotificationService: EventNotificationServiceInterface,
        @Inject(EVENTBUS_LOGGER)
        private readonly logger: winston.Logger,
    ) {
    }

    @EventPattern(EVENT_QUEUE_PATTERN)
    public async processingEventAction(@Payload() eventEntity: EventEntity, @Ctx() context: RmqContext) {
        this.logger.debug('Starting ConsumerController::processingEventAction');
        await this.eventNotificationService.processEvent(eventEntity);
        context.getChannelRef().ack(context.getMessage());
        this.logger.debug('Finishing ConsumerController::processingEventAction');
    }

    @EventPattern(NOTIFICATION_QUEUE_PATTERN)
    public async notifyAction(@Payload() notificationDto: NotificationDto, @Ctx() context: RmqContext) {
        this.logger.debug('Starting ConsumerController::notifyAction');

        if (notificationDto.tries <= (process.env.NOTIFICATION_TRIES || NOTIFICATION_TRIES_DEFAULT)) {
            await this.eventNotificationService.processNotification(notificationDto);
        }
        context.getChannelRef().ack(context.getMessage());
        this.logger.debug('Finishing ConsumerController::notifyAction');
    }
}
