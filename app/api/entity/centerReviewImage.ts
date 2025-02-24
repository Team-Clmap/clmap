import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CenterReview } from "./centerReview";

@Entity({name:'center_review_image'})
export class CenterReviewImage {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ length: 100 })
  url?: string;

  @Column()
  center_review_id?: number;

  @ManyToOne(() => CenterReview, review => review.images)
  centerReview?: CenterReview;
}