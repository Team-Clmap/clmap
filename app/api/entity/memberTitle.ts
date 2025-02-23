import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Profile } from './profile';
import { Title } from './title';

@Entity({name:'MemberTitle'})
export class MemberTitle {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'visible' })
  visible?: number;

  
  @ManyToOne(() => Profile, (profile) => profile.memberTitles)
  memberId?: Profile;

  @ManyToOne(() => Title, (title) => title.memberTitles)
  titleId?: Title;
}