import { EventNotificationService } from '../services';
import { EventEntity, EventLogEntity, SubscriberEntity, SubscriptionEntity } from '../../common';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/common';
import { createLogger } from 'winston';
import { ClientProxy } from '@nestjs/microservices';
import { createStubInstance } from 'sinon';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { NotificationDto } from '../dto/notification.dto';


describe('Consumer Controller', () => {
    let eventNotificationService: EventNotificationService;
    let subscriptionRepository: any;
    let eventLogRepository: any;
    let httpServiceMock: any;
    let loggerMock: any;
    let clientProxyMock: any;

    beforeEach(async () => {
        subscriptionRepository = createStubInstance(Repository);
        eventLogRepository = createStubInstance(Repository);
        httpServiceMock = createStubInstance(HttpService);
        loggerMock = createLogger();
        clientProxyMock = createStubInstance(ClientProxy);

        eventNotificationService = new EventNotificationService(
            subscriptionRepository,
            eventLogRepository,
            httpServiceMock,
            loggerMock,
            clientProxyMock
        );
    });

    describe('processEvent', () => {
        it('positive test', async () => {

            const eventEntity: EventEntity = {
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

            const eventLogEntity: EventLogEntity = {
                tries: 0,
                id: 1,
                deliveryDatetime: new Date(),
                event: eventEntity,
                subscriber
            };

            subscriptionRepository.find.resolves([{
                notificationUrl: 'localhost',
                subscriber
            }]);

            eventLogRepository.findOneOrFail.resolves(eventLogEntity);

            // loggerMock.debug.returns([]);
            jest.spyOn(loggerMock, 'debug').mockReturnThis();

            const observableMock = createStubInstance<Observable<AxiosResponse<any>>>(Observable);

            observableMock.toPromise.resolves({ status: 200 });

            httpServiceMock.post.returns(observableMock);

            eventLogRepository.save.resolves(eventLogEntity);

            expect(await eventNotificationService.processEvent(eventEntity)).toStrictEqual([eventLogEntity]);
        });
    });

    describe('processNotification', () => {
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

            const eventLogEntity: EventLogEntity = {
                tries: 0,
                id: 1,
                deliveryDatetime: new Date(),
                event,
                subscriber
            };

            const subscriptionEntity: SubscriptionEntity = {
                uuid: '5f175014-0fc9-4f1e-8d54-5a212e32335a',
                notificationUrl: '1',
                createdDatetime: new Date(),
                eventType: {
                    uuid: '6f175014-0fc9-4f1e-8d54-5a212e32335a',
                    name: 'test',
                },
                subscriber,
            };

            const notificationDto: NotificationDto = {
                event,
                subscriber,
                tries: 0,
            };

            subscriptionRepository.find.resolves([{
                notificationUrl: 'localhost',
                subscriber
            }]);
            subscriptionRepository.findOneOrFail.resolves(subscriptionEntity);

            eventLogRepository.findOneOrFail.resolves(eventLogEntity);

            jest.spyOn(loggerMock, 'debug').mockReturnThis();

            const observableMock = createStubInstance<Observable<AxiosResponse<any>>>(Observable);

            observableMock.toPromise.resolves({ status: 200 });

            httpServiceMock.post.returns(observableMock);

            eventLogRepository.save.resolves(eventLogEntity);

            expect(await eventNotificationService.processNotification(notificationDto)).toStrictEqual(eventLogEntity);
        });
    });

    xit('should be defined', () => {
        expect(eventNotificationService).toBeDefined();
    });
});
