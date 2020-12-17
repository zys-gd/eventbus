import { EventNotificationService } from '../services';
import { EventEntity, EventLogEntity, SubscriptionEntity } from '../../common';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/common';
import { createLogger, transports } from 'winston';
import { ClientProxy } from '@nestjs/microservices';
import { createStubInstance } from 'sinon';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { NotificationDto } from '../dto/notification.dto';
import { TestDto, TestFixtures } from '../../common/test-helpers';


describe('Consumer Controller', () => {
    let eventNotificationService: EventNotificationService;
    let subscriptionRepository: any;
    let eventLogRepository: any;
    let httpServiceMock: any;
    let loggerMock: any;
    let clientProxyMock: any;
    let fixtures: TestFixtures;
    let dto: TestDto;

    beforeEach(async () => {
        subscriptionRepository = createStubInstance(Repository);
        eventLogRepository = createStubInstance(Repository);
        httpServiceMock = createStubInstance(HttpService);
        loggerMock = createLogger({
            level: 'error',
            transports: [
                new transports.Console(),
            ]
        });
        clientProxyMock = createStubInstance(ClientProxy);
        fixtures = new TestFixtures();
        dto = new TestDto(fixtures);

        eventNotificationService = new EventNotificationService(
            subscriptionRepository,
            eventLogRepository,
            httpServiceMock,
            loggerMock,
            clientProxyMock
        );
    });

    describe('processEvent', () => {
        it('positive test', () => {

            const eventEntity: EventEntity = fixtures.getTestEventEntity();

            const eventLogEntity: EventLogEntity = fixtures.getTestEventLogEntity();
            const subscriptionEntity: SubscriptionEntity = fixtures.getTestSubscriptionEntity();

            subscriptionRepository.find.resolves([subscriptionEntity]);

            eventLogRepository.findOneOrFail.resolves(eventLogEntity);

            const observableMock = createStubInstance<Observable<AxiosResponse<any>>>(Observable);

            observableMock.toPromise.resolves({ status: 200 });

            httpServiceMock.post.returns(observableMock);

            eventLogRepository.save.resolves(eventLogEntity);

            expect(eventNotificationService.processEvent(eventEntity)).resolves.toStrictEqual([eventLogEntity]);
        });
    });

    describe('processNotification', () => {
        it('positive test', () => {

            const eventLogEntity: EventLogEntity = fixtures.getTestEventEntity();

            const subscriptionEntity: SubscriptionEntity = fixtures.getTestSubscriptionEntity();

            const notificationDto: NotificationDto = dto.getTestNotificationDto();

            subscriptionRepository.find.resolves([subscriptionEntity]);
            subscriptionRepository.findOneOrFail.resolves(subscriptionEntity);

            eventLogRepository.findOneOrFail.resolves(eventLogEntity);

            const observableMock = createStubInstance<Observable<AxiosResponse<any>>>(Observable);

            observableMock.toPromise.resolves({ status: 200 });

            httpServiceMock.post.returns(observableMock);

            eventLogRepository.save.resolves(eventLogEntity);

            expect(eventNotificationService.processNotification(notificationDto)).resolves.toStrictEqual(eventLogEntity);
        });
    });

    xit('should be defined', () => {
        expect(eventNotificationService).toBeDefined();
    });
});
