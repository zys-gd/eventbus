import { Body, Controller, Delete, Post } from '@nestjs/common';
import { SubscribeDto } from '../dto/subscribe.dto';

@Controller('subscribe')
export class SubscribeController {
    @Post()
    subscribe(@Body() subscribeDto: SubscribeDto): string {
        return 'This action make subscription for event type';
    }

    @Delete()
    unsubscribe(@Body() subscribeDto: SubscribeDto): string {
        return 'This action remove subscription';
    }
}
