import { createStubInstance } from 'sinon';
import { Repository } from 'typeorm';
import { TestFixtures } from '../../common/test-helpers';
import { SubscriberEntity } from '../../common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let subscriberRepositoryMock: any;
    let fixtures: TestFixtures;

    beforeEach(async () => {
        fixtures = new TestFixtures();
        subscriberRepositoryMock = createStubInstance(Repository);
        authService = new AuthService(subscriberRepositoryMock);
    });

    describe('validateHash', () => {
        it('positive test', () => {
            const subscriber: SubscriberEntity = fixtures.getTestSubscriberEntity();

            subscriberRepositoryMock.findOneOrFail.resolves(subscriber);
            expect(authService.validateHash(
                '123',
                '{"eventType":"test_type","data":{"123":"test data string"}}',
                '$2a$10$ujWu9IincNRJN1PqrgJ4UOnwVe1owYQy0hjvvmU2scE0fzYoUJKxq'
            )).resolves.toStrictEqual(subscriber);

            subscriberRepositoryMock.findOneOrFail.resolves();
            expect(authService.validateHash(
                '123',
                '{"eventType":"test_type","data":{"123":"test data string"}}',
                '$2a$10$ujWu9IincNRJN1PqrgJ4UOnwVe1owYQy0hjvvmU2scE0fzYoUJKxq'
            )).rejects.toThrow();
        });
    });

    describe('validateApiKey', () => {
        it('positive test', () => {
            const subscriber: SubscriberEntity = fixtures.getTestSubscriberEntity();

            subscriberRepositoryMock.findOneOrFail.resolves(subscriber);
            expect(authService.validateApiKey(
                '123',
                '$2a$10$5URrVTMzyxU.KgXREgcypOHUVmXiZoibhjSFgkRsg9GBd5/U0NmZq'
            )).resolves.toStrictEqual(subscriber);

            subscriberRepositoryMock.findOneOrFail.resolves();
            expect(authService.validateApiKey(
                '123',
                '$2a$10$5URrVTMzyxU.KgXREgcypOHUVmXiZoibhjSFgkRsg9GBd5/U0NmZq'
            )).rejects.toThrow();
        });
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });
});
