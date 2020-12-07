import { Inject, Injectable } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { EventServiceInterface } from './event.service.interface';
import { EventEntity } from '../entities/event.entity';
import { EventTypeEntity } from '../entities/event-type.entity';

@Injectable()
export class EventService implements EventServiceInterface {

    constructor(
        @InjectRepository(EventEntity)
        private readonly eventEntityRepository: Repository<EventEntity>,

        @InjectRepository(EventTypeEntity)
        private readonly eventTypeEntityRepository: Repository<EventTypeEntity>,

        @Inject('EVENT_SERVICE')
        private readonly client: ClientProxy,
    ) {}

    public async initEvent(eventDto: EventDto): Promise<void> {
        const eventType: EventTypeEntity = await this.eventTypeEntityRepository.findOneOrFail({
            where: [
                { name: eventDto.eventType },
            ]
        });

        await this.eventEntityRepository.save({
            data: eventDto.data,
            eventType: eventType,
        });

        this.client.emit<number>(eventDto.eventType, eventDto.data);
    }
}
