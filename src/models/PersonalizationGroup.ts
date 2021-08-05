import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
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

  @OneToMany(() => Personalization, personalizationGroup => PersonalizationGroup)
  @JoinColumn({ name: 'personalization_id' })
  personalization: Personalization;

  @Column()
  price: number;
}

export default PersonalizationGroup;
