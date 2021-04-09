import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_types')
export class EventTypeEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;
}
