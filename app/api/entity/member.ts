import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}