import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { MemberTitle } from './memberTitle';
import { Membership } from './membership';

// Member 테이블과 연동된 Entity
@Entity({name:'member'})
export class Member {
  @PrimaryColumn()
  id?: string;

  @Column()
  email?: string;

  @Column()
  provider?: string;

  @Column({ name: 'refresh_token' })
  refreshToken?: string;
  
  @Column({ name: 'expires_at' })
  expiresAt?: Date;
  
  @Column({ name: 'is_inited' })
  isInited?: boolean;
  
  @OneToMany(() => MemberTitle, (memberTitle) => memberTitle.member)
  memberTitles?: MemberTitle;
  
  @OneToMany(() => Membership, (membership) => membership.member)
  memberships?: Membership;
}