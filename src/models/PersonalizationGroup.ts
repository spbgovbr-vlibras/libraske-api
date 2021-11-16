import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Personalization from './Personalization';


@Entity('personalization_group')
class PersonalizationGroup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  personalization_id: number;

  @ManyToOne(() => Personalization, personalization => personalization.personalizationGroup)
  @JoinColumn({ name: 'personalization_id' })
  personalization: Personalization;

  @Column()
  price: number;
}

export default PersonalizationGroup;
