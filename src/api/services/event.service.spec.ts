import { EventService } from './event.service';
import { createStubInstance } from 'sinon';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { TestDto, TestFixtures } from '../../common/test-helpers';
import { EventDto } from '../dto';

describe('EventService', () => {
    let eventService: EventService;
    let clientProxyMock: any;
    let eventEntityRepositoryMock: any;
    let eventTypeEntityRepositoryMock: any;
    let fixtures: TestFixtures;
    let dto: TestDto;

    beforeEach(async () => {
        eventEntityRepositoryMock = createStubInstance(Repository);
        eventTypeEntityRepositoryMock = createStubInstance(Repository);
        clientProxyMock = createStubInstance(ClientProxy);
        fixtures = new TestFixtures();
        dto = new TestDto(fixtures);

        eventService = new EventService(
            eventEntityRepositoryMock,
            eventTypeEntityRepositoryMock,
            clientProxyMock
        );
    });

    describe('initEvent', () => {
        it('positive test', () => {
            const eventDto: EventDto = dto.getTestEventDto();
            eventTypeEntityRepositoryMock.findOneOrFail.resolves(fixtures.getTestEventTypeEntity());
            eventEntityRepositoryMock.save.resolves(fixtures.getTestEventEntity());

            eventService.initEvent(eventDto);
        });
    });

    it('should be defined', () => {
        expect(eventService).toBeDefined();
    });
});
