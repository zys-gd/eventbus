import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {Transport, MicroserviceOptions} from '@nestjs/microservices';

(async function () {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({logger: true}));
    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);

    // const rabbitmq = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    //     transport: Transport.RMQ,
    //     options: {
    //         urls: ['amqp://localhost:5672'],
    //         queue: 'subscribers',
    //         queueOptions: {
    //             durable: false
    //         },
    //     },
    // });
    // rabbitmq.listen(() => console.log('Microservice is listening'));
})();
