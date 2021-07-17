import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Personalization from './Personalization';
import User from './User';

@Entity('boughtPersonalization')
class BoughtPersonalization {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    personalization_id: number;

    @ManyToOne(() => Personalization)
    @JoinColumn({ name: 'personalization_id' })
    personalization: Personalization;

    @Column()
    color: string;

    @Column()
    isActive: boolean;

}

export default BoughtPersonalization;
