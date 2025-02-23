import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Record } from "./record";

@Entity({name:'record_image'})
export class RecordImage {
 @PrimaryGeneratedColumn('increment')
 id?: number;

 @Column({ length: 100 })
 url?: string;

 @Column()
 record_id?: number;

 @ManyToOne(() => Record, record => record.images)
 record?: Record;
}