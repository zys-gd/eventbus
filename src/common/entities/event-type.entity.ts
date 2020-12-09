import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_types')
export class EventTypeEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid?: string;

    @Column()
    name?: string;
}
