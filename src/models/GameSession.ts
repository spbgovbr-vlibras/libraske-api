import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  ColumnOptions,
} from 'typeorm';
import Scores from './Scores';

import Music from './Song';
import User from './User';
import environment from '../environment/environment';

const isSqlite = environment.TYPEORM_CONNECTION === 'better-sqlite3';

const pontuationColumnOptions: ColumnOptions = isSqlite
  ? { type: 'simple-json', nullable: true }
  : { type: 'int', array: true, nullable: true };

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

  @Column(pontuationColumnOptions)
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
