import { Entity, Column, PrimaryColumn } from 'typeorm';

// Profile 테이블과 연동된 Entity
@Entity({name:'Profile'})
export class Profile {
  
  @PrimaryColumn()
  id?: string;

  @Column({
    type: String,
    nullable: true
  })
  nickname?: string | null;

  @Column({ 
    type: String,
    name: 'instagram_id',
    nullable: true
   })
  instagramId?: string | null;

  @Column({ 
    name: 'climbing_start_date', 
    nullable: true
  })
  climbingStartDate?: Date;

  @Column({ 
    name: 'recent_climbing_date', 
    nullable: true
  })
  recentClimbingDate?: Date;

  @Column({ 
    name: 'average_climbing_time', 
    nullable: true 
  })
  averageClimbingTime?: number;

  @Column({ 
    name: 'average_clear_rate', 
    nullable: true 
  })
  averageClearRate?: number;

  @Column({ 
    name: 'average_level', 
    nullable: true 
  })
  averageLevel?: string;

  @Column({ 
    type: String,
    name: 'crew_name', 
    nullable: true 
  })
  crewName?: string | null;

  @Column()
  image?: string;

  @Column({ name: 'is_visited' })
  isVisited?: boolean;
}