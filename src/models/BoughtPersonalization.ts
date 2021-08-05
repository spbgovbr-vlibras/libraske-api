import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import PersonalizationGroup from './PersonalizationGroup';
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
  personalization_group_id: number;

  @ManyToOne(() => PersonalizationGroup)
  @JoinColumn({ name: 'personalization_group_id' })
  personalizationGroup: PersonalizationGroup;

  @Column()
  isActive: boolean;
}

export default BoughtPersonalization;
