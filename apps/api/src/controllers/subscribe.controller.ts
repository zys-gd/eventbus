import { Body, Controller, Delete, Post, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { SubscribeDto } from '../dto/subscribe.dto';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeService } from '../services';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { Response } from 'express';

@Controller('subscribe')
export class SubscribeController {

    constructor(
        private readonly subscribeService: SubscribeService,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Post()
    public subscribeAction(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: Response,
    ) {
        const subscription = this.subscribeService.subscribe(subscribeDto, req.user);
        res.status(HttpStatus.CREATED).send(subscription);
    }

    @UseGuards(AuthGuard('hash'))
    @Delete()
    public async unsubscribeAction(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: Response,
    ) {
        await this.subscribeService.unsubscribe(subscribeDto, req.user);
        res.status(HttpStatus.ACCEPTED).json([]);
    }
}
