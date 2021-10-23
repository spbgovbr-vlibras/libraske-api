import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import User from './User';

@Entity('songs')
class Songs {

  @PrimaryColumn()
  id: number;

  // User relationship
  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // end

  @Column()
  singers: string;

  @Column()
  thumbnail: string;

  @Column()
  animation: string;

  @Column()
  song: string;

  @Column()
  trainingAnimation1: string;

  @Column()
  trainingAnimation2: string;

  @Column()
  trainingAnimation3: string;

  @Column()
  trainingAnimation4: string;

  @Column()
  trainingAnimation5: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  subtitle: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  price: number;
}

export default Songs;
