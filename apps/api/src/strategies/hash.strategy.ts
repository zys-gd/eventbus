import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HashStrategy extends PassportStrategy(Strategy, 'hash') {
    constructor (
        private authService: AuthService,
    ) {
        super();
    }

    async authenticate(req: any) {
        if((req.headers['content-type'] || '') !== 'application/json') {
            return this.fail(404);
        }
        const subscriber = await this.authService.validateHash(
            req.headers['apikey'] || '',
            req.body,
            req.headers['hash'] || ''
        );
        if (!subscriber) {
            return this.fail(401);
        }
        return this.success(subscriber);
    }
}
