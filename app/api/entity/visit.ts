import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Member } from "./member";
import { Center } from "./center";

@Entity({name:'visit'})
export class Visit {
 @PrimaryGeneratedColumn('increment')
 id?: number;

 @Column()
 center_id?: number;

 @Column({ length: 255 })
 member_id?: string;

 @Column('datetime')
 start_time?: Date;

 @ManyToOne('Member', 'Visit', { lazy: true })
 member?: Member;

 @ManyToOne('Center', 'Visit', { lazy: true })
 center?: Center;
}