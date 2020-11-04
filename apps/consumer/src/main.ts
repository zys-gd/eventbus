import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

(async function () {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://eventbus_rabbitmq:5672'],
            queue: 'subscribers',
            queueOptions: {
                durable: false
            },
        },
    });
    app.listen(() => console.log('Microservice is listening'));
})();
