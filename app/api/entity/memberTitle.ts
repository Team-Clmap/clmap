import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Member } from './member';
import { Title } from './title';

@Entity({name:'member_title'})
export class MemberTitle {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'visible' })
  visible?: number;

  
  @ManyToOne(() => Member, (member) => member.memberTitles)
  member?: Member;

  @ManyToOne(() => Title, (title) => title.memberTitles)
  title?: Title;
}