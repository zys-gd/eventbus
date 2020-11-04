import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule.forRoot(),
                AppModule,
            ],
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => config.dbConfig,
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, AppConfigService],
    exports: [AppConfigService],
})

export class AppModule {
}
