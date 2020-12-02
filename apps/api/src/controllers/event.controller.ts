import { Body, Controller, Post } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';

@Controller('event')
export class EventController {
    @Post()
    make(@Body() eventDto: EventDto): string {
        return 'This action make event';
    }
}
