import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { HashStrategy } from './hash.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from '../entities/subscriber.entity';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([
            SubscriberEntity,
        ]),
    ],
    providers: [
        AuthService,
        HashStrategy,
    ],
})
export class AuthModule {
}
