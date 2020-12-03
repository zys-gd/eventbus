import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
export class EventController {

    @UseGuards(AuthGuard('hash'))
    @Post()
    make(@Body() eventDto: EventDto): string {
        return 'This action make event';
    }
}
