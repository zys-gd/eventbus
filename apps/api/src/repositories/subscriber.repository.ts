import { SubscriberEntity } from '../entities/subscriber.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SubscriberEntity)
export class SubscriberRepository extends Repository<SubscriberEntity>
{

}