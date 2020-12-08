import { SubscriberEntity } from '../entities';

export interface AuthServiceInterface {
    /**
     * Method for validation hash
     * @param apiKey
     * @param event
     * @param requestHash
     */
    validateHash(apiKey: string, event: string, requestHash: string): Promise<SubscriberEntity | undefined>;
}
