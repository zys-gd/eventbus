import { SubscribeService } from './subscribe.service';
import { TestDto, TestFixtures } from '../../common/test-helpers';
import { createStubInstance } from 'sinon';
import { Repository } from 'typeorm';
import { EventTypeEntity, SubscriberEntity, SubscriptionEntity } from '../../common';

describe('SubscribeService', () => {
    let subscribeService: SubscribeService;
    let fixtures: TestFixtures;
    let dto: TestDto;
    let eventTypeEntityRepositoryMock: any;
    let subscriptionEntityRepositoryMock: any;

    beforeEach(async () => {
        fixtures = new TestFixtures();
        dto = new TestDto(fixtures);
        eventTypeEntityRepositoryMock = createStubInstance(Repository);
        subscriptionEntityRepositoryMock = createStubInstance(Repository);

        subscribeService = new SubscribeService(
            subscriptionEntityRepositoryMock,
            eventTypeEntityRepositoryMock
        );
    });

    describe('subscribe', () => {
        it('positive test', () => {
            const subscription: SubscriptionEntity = fixtures.getTestSubscriptionEntity();
            const subscriber: SubscriberEntity = fixtures.getTestSubscriberEntity();
            const eventType: SubscriberEntity = fixtures.getTestEventTypeEntity();
            const subscribeDto = dto.getTestSubscribeDto();

            eventTypeEntityRepositoryMock.findOneOrFail.resolves(eventType);
            subscriptionEntityRepositoryMock.count.resolves(0);
            subscriptionEntityRepositoryMock.save.resolves(subscription);

            expect(subscribeService.subscribe(subscribeDto, subscriber)).resolves.toStrictEqual(subscription);

            subscriptionEntityRepositoryMock.count.resolves(1);
            expect(subscribeService.subscribe(subscribeDto, subscriber)).rejects.toThrow();
        });
    });

    describe('unsubscribe', () => {
        it('positive test',  () => {
            const subscriber: SubscriberEntity = fixtures.getTestSubscriberEntity();
            const eventType: EventTypeEntity = fixtures.getTestEventTypeEntity();

            eventTypeEntityRepositoryMock.findOneOrFail.resolves(eventType);
            subscriptionEntityRepositoryMock.delete.resolves({ affected: 1 });
            expect(subscribeService.unsubscribe(eventType.name || '', subscriber)).resolves.toStrictEqual(undefined);

            subscriptionEntityRepositoryMock.delete.resolves({ affected: 0 });
            expect(subscribeService.unsubscribe(eventType.name || '', subscriber)).rejects.toThrow();
        });
    });

    it('should be defined', () => {
        expect(subscribeService).toBeDefined();
    });
});
