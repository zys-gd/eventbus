import { Body, Controller, Delete, HttpStatus, Inject, Put, Req, Res, UseGuards } from '@nestjs/common';
import { SubscribeDto, UnsubscribeDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { SubscriberEntity } from '../../common';
import { SubscribeServiceInterface } from '../services';

@Controller('subscribe')
export class SubscribeController {

    constructor(
        @Inject('SubscribeServiceInterface')
        private readonly subscribeService: SubscribeServiceInterface,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Put()
    public async subscribeAction(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: any,
    ) {
        try {
            await this.subscribeService.subscribe(subscribeDto, req.user);
            res.status(HttpStatus.CREATED).send();
        }
        catch(e) {
            res.status(HttpStatus.CONFLICT).send();
        }
    }

    @UseGuards(AuthGuard('hash'))
    @Delete()
    public async unsubscribeAction(
        @Body() unsubscribeDto: UnsubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: any,
    ) {
        try {
            await this.subscribeService.unsubscribe(unsubscribeDto, req.user);
            res.status(HttpStatus.ACCEPTED).json([]);
        }
        catch(e) {
            res.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
