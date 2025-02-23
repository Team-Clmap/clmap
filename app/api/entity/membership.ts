import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Member } from './member';
import { Center } from './center';

// Member 테이블과 연동된 Entity
@Entity({name:'membership'})
export class Membership {
  @PrimaryColumn()
  id?: string;

  @Column()
  type?: string;
  
  @ManyToOne(() => Member, (member) => member.memberships)
  member?: Member;
  
  @ManyToOne(() => Center, (center) => center.memberships)
  center?: Center;

  @Column({ name: 'register_date' })
  registerDate?: Date;
  
  @Column({ name: 'expiration_period' })
  expirationPeriod?: number;
  
  @Column()
  period?: number;

  @Column({ name: 'total_count' })
  totalCount?: number;
  
  @Column({ name: 'rest_count' })
  restCount?: number;
}