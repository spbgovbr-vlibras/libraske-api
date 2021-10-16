import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Unique,
} from 'typeorm';
import GameSession from './GameSession';
import Songs from './Song';
import User from './User';


@Entity('boughtSongs')
@Unique("IDX_UNIQUE_USER_SONG", ["song_id", "user_id"])
class BoughtSongs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User relationship
  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // end

  // User relationship
  @Column()
  song_id: number;

  @OneToOne(() => Songs)
  @JoinColumn({ name: 'song_id' })
  song: Songs;
  // end


}

export default BoughtSongs;
