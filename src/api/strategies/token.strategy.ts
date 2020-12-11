import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { Inject } from '@nestjs/common';
import { AuthServiceInterface } from '../services';

export class TokenStrategy extends PassportStrategy(Strategy, 'apiKey') {
    constructor(
        @Inject('AuthService')
        private authService: AuthServiceInterface,
    ) {
        super();
    }

    async authenticate(req: any) {
        if ((req.headers['content-type'] || '') !== 'application/json') {
            return this.fail(404);
        }
        const subscriber = await this.authService.validateApiKey(
            req.headers['apikey'] || '',
            req.headers['hash'] || ''
        );
        if (!subscriber) {
            return this.fail(401);
        }
        return this.success(subscriber);
    }
}
