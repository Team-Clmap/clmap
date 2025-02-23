import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Record } from "./record";

@Entity({name:'try_record'})
export class TryRecord {
 @PrimaryGeneratedColumn('increment')
 id?: number;

 @Column({ length: 255 })
 v_level?: string;

 @Column()
 record_id?: number;

 @Column({ length: 255 })
 color_level?: string;

 @Column()
 try_count?: number;

 @Column()
 complete_count?: number;

 @ManyToOne(() => Record, record => record.tryRecords)
 record?: Record;
}