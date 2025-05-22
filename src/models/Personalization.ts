import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import PersonalizationGroup from './PersonalizationGroup';
import User from './User';

@Entity('personalizations')
class Personalization {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @OneToMany(() => PersonalizationGroup, personalizationGroup => personalizationGroup.personalization)
  personalizationGroup: PersonalizationGroup[]

}

export default Personalization;
