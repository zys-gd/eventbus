import { Body, Controller, Delete, HttpStatus, Put, Req, Res, UseGuards } from '@nestjs/common';
import { SubscribeDto, UnsubscribeDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeService } from '../services';
import { SubscriberEntity } from '../entities';
import { Response } from 'express';

@Controller('subscribe')
export class SubscribeController {

    constructor(
        private readonly subscribeService: SubscribeService,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Put()
    public async subscribeAction(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: Response,
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
        @Res() res: Response,
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
