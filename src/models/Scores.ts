import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import GameSession from './GameSession';


@Entity('scores')
class Scores {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Scores relationship
    @Column()
    game_session_id: string;

    @OneToOne(() => GameSession)
    @JoinColumn({ name: 'game_session_id' })
    gameSession: GameSession;
    // end

    @Column({ name: 'session_score' })
    sessionScore: number;
}

export default Scores;
