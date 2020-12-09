import { UnsubscribeDtoInterface } from './unsubscribe.dto.interface';


export class UnsubscribeDto implements UnsubscribeDtoInterface {
    constructor(
        public readonly eventType: string,
    ) {
    }
}
