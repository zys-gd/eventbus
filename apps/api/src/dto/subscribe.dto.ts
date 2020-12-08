import { SubscribeDtoInterface } from './subscribe.dto.interface';


export class SubscribeDto implements SubscribeDtoInterface {
    constructor(
        public readonly eventType: string,
        public readonly notificationUrl: string,
    ) {
    }
}
