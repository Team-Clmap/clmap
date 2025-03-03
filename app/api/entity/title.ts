import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { MemberTitle } from './memberTitle';

@Entity({name:'title'})
export class Title {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  name?: string;

  @Column()
  color?: string;
  
  @OneToMany('MemberTitle', 'Title', { lazy: true })
  memberTitles?: Promise<MemberTitle[]>;
}