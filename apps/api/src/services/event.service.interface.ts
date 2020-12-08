import { EventDto } from '../dto';

export interface EventServiceInterface {
    /**
     *
     * @param eventDto
     */
    initEvent(eventDto: EventDto): Promise<void>;
}
