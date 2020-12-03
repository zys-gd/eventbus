import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { HashStrategy } from './hash.strategy';

@Module({
    imports: [PassportModule],
    providers: [AuthService, HashStrategy],
})
export class AuthModule {
}
