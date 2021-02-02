import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

(async function () {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
        transport: Transport.RMQ,
        options: {
            urls: [String(process.env.RABBITMQ_URL)],
            queue: process.env.QUEUE_NAME || 'events',
            noAck: false,
            queueOptions: {
                durable: true
            },
        },
    });
    app.listen(() => {
        return;
    });
})();
