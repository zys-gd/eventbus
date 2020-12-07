import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../services';
import { Response } from 'express';

@Controller('event')
export class EventController {

    constructor(
        private readonly eventService: EventService,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Post()
    make(
        @Body() eventDto: EventDto,
        @Res() res: Response,
    ) {
        this.eventService.initEvent(eventDto);
        res.status(HttpStatus.OK).json([]);
    }
}
