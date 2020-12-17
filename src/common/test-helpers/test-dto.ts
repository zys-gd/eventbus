import { NotificationDto } from '../../consumer/dto/notification.dto';
import { TestFixtures } from './test-fixtures';
import { EventDto, SubscribeDto } from '../../api/dto';

export class TestDto {
    constructor(
        private readonly fixtures: TestFixtures,
    ) {  }

    public getTestNotificationDto(): NotificationDto {
        return {
            event: this.fixtures.getTestEventEntity(),
            subscriber: this.fixtures.getTestSubscriberEntity(),
            tries: 0,
        }
    }

    public getTestEventDto(): EventDto {
        return {
            data: '{"eventType":"test_type","data":{"123":"test data string"}}',
            eventType: 'test_type'
        };
    }

    public getTestSubscribeDto(): SubscribeDto {
        return {
            eventType: 'test_type',
            notificationUrl: 'localhost'
        };
    }
}
