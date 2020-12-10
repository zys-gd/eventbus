import { Body, Controller, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { EventDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { EventServiceInterface } from '../services';
import { EVENTBUS_LOGGER } from '../../common';
import winston from 'winston';

@Controller('event')
export class EventController {

    constructor(
        @Inject('EventService')
        private readonly eventService: EventServiceInterface,
        @Inject(EVENTBUS_LOGGER)
        private readonly logger: winston.Logger,
    ) {}


    @UseGuards(AuthGuard('hash'))
    @Post()
    public async makeAction(
        @Body() eventDto: EventDto,
        @Res() res: any,
    ) {
        this.logger.debug('Starting EventController::makeAction');
        this.logger.debug('EventDto: %s', JSON.stringify(eventDto));

        await this.eventService.initEvent(eventDto);
        res.status(HttpStatus.CREATED).send();

        this.logger.debug('Finishing EventController::makeAction');
    }
}
