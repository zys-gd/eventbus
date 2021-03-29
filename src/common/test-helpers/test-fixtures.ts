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
            uuid: '444e7ac7-d42a-4962-a6a5-684a85cb09c5',
            name: 'test_type'
        };
    }

    public getTestSubscriberEntity(): SubscriberEntity {
        return   {
            id: 123,
            subscriber: 'b2c',
            apiKey: '123',
            apiSecret: 'salt',
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
