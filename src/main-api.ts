import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';

(async function () {
    const app = await NestFactory.create<NestFastifyApplication>(
        ApiModule,
        new FastifyAdapter({
            logger: true,
        }),
    );
    app.setGlobalPrefix('api');
    await app.listen(3000, '0.0.0.0');
    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${await app.getUrl()}`);
})();
