import { ConsumerController } from './consumer.controller';
import { EventNotificationServiceInterface } from '../services/event-notification.service.interface';
import { createLogger } from 'winston';
import { EventNotificationService } from '../services';
import { createStubInstance } from 'sinon';
import { EventEntity, SubscriberEntity } from '../../common';
import { RmqContext } from '@nestjs/microservices';
import { NotificationDto } from '../dto/notification.dto';

class ChannelWrapper {
    public ack() {
        return;
    };
}

describe('Consumer Controller', () => {
    let consumerController: ConsumerController;
    let eventNotificationServiceMock: EventNotificationServiceInterface;
    let loggerMock: any;


    beforeEach(async () => {
        loggerMock = createLogger({ level: 'error' });
        eventNotificationServiceMock = createStubInstance(EventNotificationService);
        consumerController = new ConsumerController(eventNotificationServiceMock, loggerMock);
    });

    describe('processingEventAction', () => {
        it('positive test', async () => {
            const event: EventEntity = {
                id: 1,
                data: '{"eventType":"test_type","data":{"123":"test data string"}}',
                createdDatetime: new Date(),
                eventType: {
                    uuid: '4f175014-0fc9-4f1e-8d54-5a212e32335b',
                    name: 'test'
                },
            };

            const rmqContext: any = createStubInstance<RmqContext>(RmqContext);
            const channelWrapper: any = createStubInstance<ChannelWrapper>(ChannelWrapper);

            rmqContext.getMessage.returns({});
            rmqContext.getChannelRef.returns(channelWrapper);
            jest.spyOn(loggerMock, 'debug').mockReturnThis();

            await consumerController.processingEventAction(event, rmqContext);
        });
    });

    describe('notifyAction', () => {
        it('positive test', async () => {
            const event: EventEntity = {
                id: 1,
                data: '{"eventType":"test_type","data":{"123":"test data string"}}',
                createdDatetime: new Date(),
                eventType: {
                    uuid: '4f175014-0fc9-4f1e-8d54-5a212e32335b',
                    name: 'test'
                },
            };
            const subscriber: SubscriberEntity = {
                uuid: '4f175014-0fc9-4f1e-8d54-5a212e32335a',
            };
            const notificationDto: NotificationDto = {
                event,
                subscriber,
                tries: 0,
            };

            const rmqContext: any = createStubInstance<RmqContext>(RmqContext);
            const channelWrapper: any = createStubInstance<ChannelWrapper>(ChannelWrapper);

            rmqContext.getMessage.returns({});
            rmqContext.getChannelRef.returns(channelWrapper);
            jest.spyOn(loggerMock, 'debug').mockReturnThis();

            await consumerController.notifyAction(notificationDto, rmqContext);
        });
    });

    xit('should be defined', () => {
        expect(consumerController).toBeDefined();
    });
});
