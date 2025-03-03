import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Member } from './member';
import { Center } from './center';

// Member 테이블과 연동된 Entity
@Entity({name:'membership'})
export class Membership {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  type?: string;
  
  @ManyToOne('Member', 'Membership', { lazy: true })
  member?: Member;
  
  @ManyToOne('Center', 'Membership', { lazy: true })
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