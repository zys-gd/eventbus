import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { EventDto } from '../dto';
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
    public async makeAction(
        @Body() eventDto: EventDto,
        @Res() res: Response,
    ) {
        await this.eventService.initEvent(eventDto);
        res.status(HttpStatus.CREATED).send();
    }
}
