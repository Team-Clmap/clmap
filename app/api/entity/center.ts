import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Membership } from './membership';
// Member 테이블과 연동된 Entity
@Entity({name:'center'})
export class Center {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  visitingCount?: number;

  @Column({ name: 'expected_count' })
  expectedCount?: number;

  @Column({ name: 'location' })
  location?: string;
  
  @Column({ name: 'open_time' })
  openTime?: string;
  
  @Column({ name: 'tel1' })
  tel1?: string;
  
  @Column({ name: 'tel2' })
  tel2?: string;
  
  @Column({ name: 'instagram_id' })
  instagramId?: string;
  
  @Column({ name: 'image' })
  image?: string;
  
  @Column({ name: 'center_review_count' })
  center_review_count?: number;
  
  @Column({ name: 'problem_review_count' })
  problem_review_count?: string;

  @OneToMany('Membership', 'Center', { lazy: true })
  memberships?: Membership[];
}