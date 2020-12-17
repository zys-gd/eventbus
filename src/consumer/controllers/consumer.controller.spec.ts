import { ConsumerController } from './consumer.controller';
import { EventNotificationServiceInterface } from '../services/event-notification.service.interface';
import { createLogger, transports } from 'winston';
import { EventNotificationService } from '../services';
import { createStubInstance } from 'sinon';
import { EventEntity } from '../../common';
import { RmqContext } from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';
import { TestDto, TestFixtures } from '../../common/test-helpers';

describe('Consumer Controller', () => {
    let consumerController: ConsumerController;
    let eventNotificationServiceMock: EventNotificationServiceInterface;
    let loggerMock: any;
    let fixtures: TestFixtures;
    let dto: TestDto;

    beforeEach(async () => {
        loggerMock = createLogger({
            level: 'error',
            transports: [
                new transports.Console(),
            ]
        });
        fixtures = new TestFixtures();
        dto = new TestDto(fixtures);
        eventNotificationServiceMock = createStubInstance(EventNotificationService);
        consumerController = new ConsumerController(eventNotificationServiceMock, loggerMock);
    });

    describe('processingEventAction', () => {
        it('positive test', () => {
            const event: EventEntity = fixtures.getTestEventEntity();

            const rmqContext: any = createStubInstance<RmqContext>(RmqContext);

            rmqContext.getMessage.returns({});
            rmqContext.getChannelRef.returns({ ack: () => undefined });

            consumerController.processingEventAction(event, rmqContext);
        });
    });

    xdescribe('processingEventAction', () => {
        it('negative test', () => {
            const rmqContext: any = createStubInstance<RmqContext>(RmqContext);

            rmqContext.getMessage.returns({});
            rmqContext.getChannelRef.returns({ ack: () => undefined });

            expect(consumerController.processingEventAction({}, rmqContext)).resolves.toThrow();
        });
    });

    describe('notifyAction', () => {
        it('positive test', () => {
            const notificationDto: NotificationDto = dto.getTestNotificationDto();

            const rmqContext: any = createStubInstance<RmqContext>(RmqContext);

            rmqContext.getMessage.returns({});
            rmqContext.getChannelRef.returns({ ack: () => undefined });

            consumerController.notifyAction(notificationDto, rmqContext);
        });
    });

    xdescribe('notifyAction', () => {
        it('negative test', () => {
            const rmqContext: any = createStubInstance<RmqContext>(RmqContext);

            rmqContext.getMessage.returns({});
            rmqContext.getChannelRef.returns({ ack: () => undefined });

            const brokenNotificationDto: NotificationDto = {
                event: {},
                subscriber: {},
                tries: 11,
            };
            expect(consumerController.notifyAction(brokenNotificationDto, rmqContext)).resolves.toThrow();
        });
    });
});
