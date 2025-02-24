import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProblemReview } from "./problemReview";

@Entity({name:'problem_review_image'})
export class ProblemReviewImage {
 @PrimaryGeneratedColumn('increment')
 id?: number;

 @Column({ length: 100 })
 url?: string;

 @Column()
 problem_review_id?: number;

 @ManyToOne('ProblemReview', 'ProblemReviewImage', { lazy: true })
 problemReview?: ProblemReview;
}