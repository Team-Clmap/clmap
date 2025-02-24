import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProblemReviewImage } from "./problemReviewImage";
import { Member } from "./member";
import { Center } from "./center";

@Entity({name:'problem_review'})
export class ProblemReview {
 @PrimaryGeneratedColumn('increment')
 id?: number;

 @Column({ length: 10 })
 sector?: string;

 @Column({ length: 255 })
 member_id?: string;

 @Column()
 center_id?: number;

 @Column({ length: 10 })
 actual_level?: string;

 @Column({ length: 10 })
 expected_v_level?: string;

 @Column({ length: 10 })
 expected_color_level?: string;

 @Column('text')
 content?: string;

 @CreateDateColumn()
 created_date?: Date;

 @UpdateDateColumn()
 updated_date?: Date;

 @OneToMany('ProblemReviewImage', 'ProblemReview', { lazy: true })
 images?: ProblemReviewImage[];

 @ManyToOne('Member', 'ProblemReview', { lazy: true })
 member?: Member;

 @ManyToOne('Center', 'ProblemReview', { lazy: true })
 center?: Center;
}
