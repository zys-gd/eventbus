import { Body, Controller, Delete, HttpStatus, Inject, Param, Put, Req, Res, UseGuards } from '@nestjs/common';
import { SubscribeDto, UnsubscribeDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { EVENTBUS_LOGGER, SubscriberEntity } from '../../common';
import { SubscribeServiceInterface } from '../services';
import { Logger } from 'winston';

@Controller('subscription')
export class SubscribeController {

    constructor(
        @Inject('SubscribeService')
        private readonly subscribeService: SubscribeServiceInterface,
        @Inject(EVENTBUS_LOGGER)
        private readonly logger: Logger,
    ) {
    }

    @UseGuards(AuthGuard('hash'))
    @Put()
    public async subscribeAction(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: any,
    ) {
        this.logger.debug('Starting SubscribeController::subscribeAction');
        this.logger.debug('SubscribeDto: %s', JSON.stringify(subscribeDto));

        try {
            await this.subscribeService.subscribe(subscribeDto, req.user);
            res.status(HttpStatus.CREATED).send();
        } catch (e) {
            res.status(HttpStatus.CONFLICT).send();
        }
        this.logger.debug('Finishing SubscribeController::subscribeAction');
    }

    @UseGuards(AuthGuard('apiKey'))
    @Delete(':eventType')
    public async unsubscribeAction(
        @Req() req: { user: SubscriberEntity },
        @Res() res: any,
        @Param() params: any,
    ) {
        this.logger.debug('Starting SubscribeController::unsubscribeAction');
        this.logger.debug('SubscribeDto: %s', JSON.stringify(UnsubscribeDto));

        try {
            await this.subscribeService.unsubscribe(params.eventType, req.user);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (e) {
            res.status(HttpStatus.NOT_FOUND).send();
        }
        this.logger.debug('Finishing SubscribeController::unsubscribeAction');
    }
}
