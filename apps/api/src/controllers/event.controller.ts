import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../services';

@Controller('event')
export class EventController {

    constructor(
        private readonly eventService: EventService,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Post()
    make(@Body() eventDto: EventDto) {
        this.eventService.initEvent(eventDto);
    }
}
