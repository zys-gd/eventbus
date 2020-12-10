import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { AuthServiceInterface } from '../services';

@Injectable()
export class HashStrategy extends PassportStrategy(Strategy, 'hash') {
    constructor (
        @Inject('AuthService')
        private authService: AuthServiceInterface,
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
