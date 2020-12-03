import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { AuthService } from './auth.service';

@Injectable()
export class HashStrategy extends PassportStrategy(Strategy, 'hash') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(apiKey: string, request: string, requestHash: string): Promise<any> {
        const user = await this.authService.validateHash(apiKey, request, requestHash);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
