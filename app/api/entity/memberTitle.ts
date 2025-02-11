import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Member } from './member';
import { Title } from './title';

@Entity({name:'MemberTitle'})
export class MemberTitle {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'visible' })
  visible?: number;

  
  @ManyToOne(() => Member, (member) => member.memberTitles)
  memberId?: Member;

  @ManyToOne(() => Title, (title) => title.memberTitles)
  titleId?: Title;
}