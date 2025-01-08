import { Entity, Column, PrimaryColumn } from 'typeorm';

// Profile 테이블과 연동된 Entity
@Entity({name:'Profile'})
export class Profile {
  
  @PrimaryColumn()
  id?: string;

  @Column()
  nickname?: string;

  @Column({ name: 'instagram_id' })
  instagramId?: string;

  @Column({ name: 'climbing_start_date' })
  climbingStartDate?: Date;

  @Column({ name: 'recent_climbing_date' })
  recentClimbingDate?: Date;

  @Column({ name: 'average_climbing_time' })
  averageClimbingTime?: number;

  @Column({ name: 'average_clear_rate' })
  averageClearRate?: number;

  @Column({ name: 'average_level' })
  averageLevel?: string;

  @Column({ name: 'crew_name' })
  crewName?: string;

  @Column()
  image?: string;

  @Column({ name: 'is_visited' })
  isVisited?: boolean;
}