import { Entity, Column, PrimaryColumn, OneToMany, JoinTable } from 'typeorm';
import { MemberTitle } from './memberTitle';

@Entity({name:'title'})
export class Title {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  color?: string;
  
  @OneToMany(() => MemberTitle, (memberTitle) => memberTitle.title)
  memberTitles?: MemberTitle;
}