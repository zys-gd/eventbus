import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';

(async function () {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({logger: true}));
    await app.listen(3000, '0.0.0.0');
    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${await app.getUrl()}`);
})();
