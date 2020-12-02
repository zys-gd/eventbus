import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory } from '@nestjs/microservices';

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
    providers: [
        AppService,
        AppConfigService,
        {
            provide: 'EVENT_SERVICE',
            useFactory: (configService: AppConfigService) => {
                return ClientProxyFactory.create(configService.rabbitmqConfig);
            },
            inject: [AppConfigService],
        }
    ],
    exports: [AppConfigService],
})

export class AppModule {
}
