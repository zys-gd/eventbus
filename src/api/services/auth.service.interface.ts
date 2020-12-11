import { SubscriberEntity } from '../../common';

export interface AuthServiceInterface {
    /**
     * Method for validation hash
     * @param apiKey
     * @param event
     * @param requestHash
     */
    validateHash(apiKey: string, event: string, requestHash: string): Promise<SubscriberEntity | undefined>;

    /**
     * validate API Key access
     * @param apiKey
     * @param requestHash
     */
    validateApiKey(apiKey: string, requestHash: string): Promise<SubscriberEntity | undefined>;
}
