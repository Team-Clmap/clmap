import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Member } from './member';
import { Title } from './title';

@Entity({name:'member_title'})
export class MemberTitle {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'visible' })
  visible?: number;

  
  @ManyToOne('Member', 'MemberTitles', { lazy: true })
  member?: Promise<Member>;

  @ManyToOne('Title', 'MemberTitles', { lazy: true })
  title?: Promise<Title>;
}