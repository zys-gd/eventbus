import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { AuthService } from '../services/auth.service';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class HashStrategy extends PassportStrategy(Strategy, 'hash') {
    constructor (
        private authService: AuthService,
    ) {
        super();
    }

    async authenticate(req: any) {
        const user = await this.authService.validateHash(
            req.headers['apikey'] || '',
            req.body as EventDto,
            req.headers['hash'] || ''
        );
        if (!user) {
            return this.fail(401);
        }
        return this.success(user);
    }
}
