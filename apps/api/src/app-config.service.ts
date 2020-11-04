import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export class AppConfigService {
    constructor(private config: ConfigService) {
    }

    get dbConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            username: this.config.get('MYSQL_USER', 'root'),
            password: this.config.get('MYSQL_PASSWORD', '123123'),
            database: this.config.get('MYSQL_DATABASE', 'eventbus'),
            host: this.config.get('MYSQL_HOST', 'localhost'),
            port: this.config.get('MYSQL_PORT', 3306),
            debug: this.config.get('MYSQL_DEBUG') === 'true' ? ['ComQueryPacket'] : false,
            synchronize: true,
        };
    }
}
