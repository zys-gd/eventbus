import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            debug: process.env.MYSQL_DEBUG === 'true' ? ['ComQueryPacket'] : false,
            synchronize: true,
            entities: [
                './entities/*entity.ts'
            ],
            migrations: [
                './migrations/*.ts'
            ],
            cli: {
                entitiesDir: 'entities',
                migrationsDir: 'migrations',
            }
        }),
        ClientsModule.register([
            {
                name: 'EVENT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [String(process.env.RABBITMQ_CONNECTION)],
                    queue: process.env.QUEUE_NAME || '',
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ]),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
    exports: [],
})

export class AppModule {
}
