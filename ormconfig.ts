/* tslint:disable:object-literal-sort-keys */
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './apps/api/src/app-config.service';

export = {
    ...(new AppConfigService(new ConfigService())).dbConfig,
    entities: ['apps/api/src/entities/*.entity.ts'],
    migrations: ['apps/api/src/migrations/*.ts'],
    cli: {
        migrationsDir: 'apps/api/src/migrations',
        entitiesDir: 'apps/api/src/entities',
    },
    debug: false,
};
