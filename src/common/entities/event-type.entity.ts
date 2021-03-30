import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_types')
export class EventTypeEntity {

    @PrimaryGeneratedColumn()
    uuid?: string;

    @Column()
    name?: string;
}
