import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Music from './Song';
import User from './User';

@Entity('game_sessions')
class GameSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Music relationship
  @Column()
  song_id: string;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'song_id' })
  song: Music;
  // end

  // User relationship
  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // end

  @Column()
  pontuation: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GameSession;
