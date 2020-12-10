import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

(async function () {
    await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
        transport: Transport.RMQ,
        options: {
            urls: [String(process.env.RABBITMQ_CONNECTION)],
            queue: process.env.QUEUE_NAME || '',
            noAck: false,
            queueOptions: {
                durable: true
            },
        },
    });
})();
