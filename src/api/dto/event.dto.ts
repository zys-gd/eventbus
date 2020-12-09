import { EventDtoInterface } from './event.dto.interface';

export class EventDto implements EventDtoInterface {
    constructor(
        public readonly data: string,
        public readonly eventType: string,
    ) {}
}
