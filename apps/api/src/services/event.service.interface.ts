import { EventDto } from '../dto';

export interface EventServiceInterface {
    initEvent(eventDto: EventDto): Promise<void>;
}
