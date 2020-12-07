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
    subscribe(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: Response,
    ) {
        const subscription = this.subscribeService.subscribe(subscribeDto, req.user);
        res.send(subscription);
    }

    @UseGuards(AuthGuard('hash'))
    @Delete()
    unsubscribe(
        @Body() subscribeDto: SubscribeDto,
        @Req() req: { user: SubscriberEntity },
        @Res() res: Response,
    ) {
        this.subscribeService.unsubscribe(subscribeDto, req.user);
        res.status(HttpStatus.OK).json([]);
    }
}
