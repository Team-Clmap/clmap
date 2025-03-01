import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Member } from './member';
import { Title } from './title';

@Entity({name:'member_title'})
export class MemberTitle {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'visible' })
  visible?: number;

  
  @ManyToOne('Member', 'MemberTitles', { lazy: true })
  member?: Promise<Member>;

  @ManyToOne('Title', 'MemberTitles', { lazy: true })
  title?: Promise<Title>;
}