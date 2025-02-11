import { Entity, Column, PrimaryColumn, OneToMany, JoinTable } from 'typeorm';
import { MemberTitle } from './memberTitle';

@Entity({name:'Title'})
export class Title {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  color?: string;
  
  @OneToMany(() => MemberTitle, (memberTitle) => memberTitle.titleId)
  memberTitles?: MemberTitle;
}