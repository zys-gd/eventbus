import { TokenStrategy } from './token.strategy';
import { AuthService } from '../services';
import { createStubInstance } from 'sinon';
import { TestFixtures } from '../../common/test-helpers';

describe('TokenStrategy', () => {
    let tokenStrategy: TokenStrategy;
    let authServiceMock: any;
    let fixtures: TestFixtures;

    beforeEach(async () => {
        fixtures = new TestFixtures();
        authServiceMock = createStubInstance(AuthService);
        tokenStrategy = new TokenStrategy(authServiceMock);
    });

    xdescribe('authenticate', () => {
        it('positive test', () => {
            authServiceMock.validateHash.resolves(fixtures.getTestSubscriberEntity());

            tokenStrategy.authenticate({
                headers: {
                    'content-type': 'application/json',
                    'apikey': '123',
                    'hash': '$2a$10$5URrVTMzyxU.KgXREgcypOHUVmXiZoibhjSFgkRsg9GBd5/U0NmZq',
                },
            });
        });
    });

    describe('authenticate', () => {
        it('negative test', () => {
            authServiceMock.validateHash.resolves(fixtures.getTestSubscriberEntity());

            expect(tokenStrategy.authenticate({})).rejects.toThrow();
        });
    });

    it('should be defined', () => {
        expect(tokenStrategy).toBeDefined();
    });
});
