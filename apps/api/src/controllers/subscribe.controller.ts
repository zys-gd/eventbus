import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { SubscribeDto } from '../dto/subscribe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscribe')
export class SubscribeController {

    @UseGuards(AuthGuard('hash'))
    @Post()
    subscribe(@Body() subscribeDto: SubscribeDto): string {
        return 'This action make subscription for event type';
    }

    @UseGuards(AuthGuard('hash'))
    @Delete()
    unsubscribe(@Body() subscribeDto: SubscribeDto): string {
        return 'This action remove subscription';
    }
}
