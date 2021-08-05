import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PersonalizationGroup from "./PersonalizationGroup";

@Entity("personalization_color")
class PersonalizationColor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code: string;

  @Column()
  isDefault: boolean;

  @Column()
  personalization_group_id: number;

  @ManyToOne(() => PersonalizationGroup)
  @JoinColumn({ name: 'personalization_group_id' })
  personalizationGroup: PersonalizationGroup;
}

export default PersonalizationColor;