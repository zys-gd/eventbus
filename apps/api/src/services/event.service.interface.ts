import { EventDto } from '../dto/event.dto';

export interface EventServiceInterface {
    initEvent(eventDto: EventDto): Promise<void>;
}