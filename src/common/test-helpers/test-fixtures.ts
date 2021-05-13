import { EventEntity, EventLogEntity, EventTypeEntity, SubscriberEntity, SubscriptionEntity } from '../entities';

export class TestFixtures {
    public getTestEventEntity(): EventEntity {
        return {
            id: 1,
            data: '{"eventType":"test_type","data":{"123":"test data string"}}',
            createdDatetime: new Date(),
            eventType: this.getTestEventTypeEntity(),
        };
    }

    public getTestEventTypeEntity(): EventTypeEntity {
        return   {
            id: 123,
            name: 'test_type'
        };
    }

    public getTestSubscriberEntity(): SubscriberEntity {
        return   {
            id: 123,
            subscriber: 'b2c',
            apiKey: '123',
            apiSecret: 'salt',
            apiSubscribeSecret: 'salt',
            active: true
        };
    }

    public getTestEventLogEntity(): EventLogEntity {
        return {
            tries: 0,
            id: 1,
            deliveryDatetime: new Date(),
            event: this.getTestEventEntity(),
            subscriber: this.getTestSubscriberEntity(),
        };
    }

    public getTestSubscriptionEntity(): SubscriptionEntity {
        return {
            uuid: '83e9263e-1bca-46ca-b780-466cab3173ce',
            notificationUrl: 'localhost',
            createdDatetime: new Date(),
            eventType: this.getTestEventTypeEntity(),
            subscriber: this.getTestSubscriberEntity(),
        };
    }
}
