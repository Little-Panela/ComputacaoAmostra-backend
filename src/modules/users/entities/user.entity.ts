import { Vote } from '../../votes/entities/vote.entity';
import { TVote } from '../../votes/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { TUser } from '../types';

@Entity({ name: 'users' })
export class User implements TUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ default: 0, insert: false })
  voteCount: number;

  @OneToMany(() => Vote, (vote) => vote.userId)
  votes: string[] | TVote[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}
