import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from './User';

@Entity('songs')
class Songs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User relationship
  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // end

  @Column()
  singers: string;

  @Column()
  thumbnail: string;

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
}

export default Songs;
