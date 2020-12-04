import { Body, Controller, Delete, Post, UseGuards, Req } from '@nestjs/common';
import { SubscribeDto } from '../dto/subscribe.dto';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeService } from '../services';
import { SubscriberEntity } from '../entities/subscriber.entity';

@Controller('subscribe')
export class SubscribeController {

    constructor(
        private readonly subscribeService: SubscribeService,
    ) {}

    @UseGuards(AuthGuard('hash'))
    @Post()
    subscribe(@Body() subscribeDto: SubscribeDto, @Req() req: { user: SubscriberEntity }) {
        this.subscribeService.subscribe(subscribeDto, req.user);
    }

    @UseGuards(AuthGuard('hash'))
    @Delete()
    unsubscribe(@Body() subscribeDto: SubscribeDto) {
        this.subscribeService.unsubscribe(subscribeDto);
    }
}
