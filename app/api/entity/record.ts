import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { RecordImage } from "./recordImage";
import { TryRecord } from "./tryRecord";
import { Member } from "./member";
import { Center } from "./center";

@Entity({name:'record'})
export class Record {
 @PrimaryGeneratedColumn('increment')
 id?: number;

 @Column({ length: 255 })
 member_id?: string;

 @Column()
 center_id?: number;

 @CreateDateColumn()
 created_date?: Date;

 @Column('datetime')
 start_time?: Date;

 @Column('datetime')
 end_time?: Date;

 @Column('datetime')
 register_date?: Date;

 @UpdateDateColumn()
 updated_date?: Date;

 @OneToMany(() => RecordImage, image => image.record)
 images?: RecordImage[];

 @OneToMany(() => TryRecord, tryRecord => tryRecord.record)
 tryRecords?: TryRecord[];

 @ManyToOne(() => Member)
 member?: Member;

 @ManyToOne(() => Center)
 center?: Center;
}