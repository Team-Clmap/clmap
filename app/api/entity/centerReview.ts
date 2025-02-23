import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CenterReviewImage } from "./centerReviewImage";
import { Member } from "./member";
import { Center } from "./center";

@Entity({name:'center_review'})
export class CenterReview {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('text')
  content?: string;

  @Column({ length: 255 })
  member_id?: string;

  @Column()
  center_id?: number;

  @CreateDateColumn()
  created_date?: Date;

  @UpdateDateColumn()
  updated_date?: Date;

  @OneToMany(() => CenterReviewImage, image => image.centerReview)
  images?: CenterReviewImage[];

  @ManyToOne(() => Member)
  member?: Member;

  @ManyToOne(() => Center)
  center?: Center;
}