import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Scores from './Scores';

import Music from './Song';
import User from './User';

@Entity('game_sessions')
class GameSession {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Music relationship
  @Column()
  song_id: number;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'song_id' })
  song: Music;
  // end

  @Column()
  isClosed: boolean;

  // User relationship
  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // end

  @Column('int', { array: true })
  pontuation: number[];


  //Score relationship

  @OneToOne(() => Scores, gameSession => GameSession)
  score: Scores;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GameSession;
