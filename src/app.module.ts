import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '192.168.16.6',
            port: 3306,
            username: 'root',
            password: '123123',
            database: 'eventbus',
            entities: [],
            synchronize: true,
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {
    constructor(private connection: Connection) {
    }
}
