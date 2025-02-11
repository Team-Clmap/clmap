import { Entity, Column, PrimaryColumn, OneToMany, JoinTable } from 'typeorm';
import { MemberTitle } from './memberTitle';
import { Membership } from './membership';

// Member 테이블과 연동된 Entity
@Entity({name:'Member'})
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
  
  @OneToMany(() => MemberTitle, (memberTitle) => memberTitle.memberId)
  memberTitles?: MemberTitle;
  
  @OneToMany(() => Membership, (membership) => membership.memberId)
    memberships?: Membership;
}