import { Body, Controller, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { EventDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { EventServiceInterface } from '../services';

@Controller('event')
export class EventController {

    constructor(
        @Inject('EventServiceInterface')
        private readonly eventService: EventServiceInterface,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Post()
    public async makeAction(
        @Body() eventDto: EventDto,
        @Res() res: any,
    ) {
        await this.eventService.initEvent(eventDto);
        res.status(HttpStatus.CREATED).send();
    }
}
