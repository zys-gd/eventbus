import { Channel, connect } from 'amqplib';

export async function createQueueChannel(url: string): Promise<Channel> {
    const connection = await connect(url);
    return connection.createChannel();
}

export async function createDelayedQueue(channel: Channel, queueName: string): Promise<void> {
    const exchangeName = queueName;
    await channel.assertQueue(queueName);
    await channel.assertExchange(exchangeName, 'x-delayed-message', {
        arguments: { 'x-delayed-type': 'direct' },
    });
    await channel.bindQueue(queueName, exchangeName, '');
}
