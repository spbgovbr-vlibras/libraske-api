import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true, type: 'text' })
  profilePhoto: string | null;

  @Column({ nullable: true, type: 'text' })
  refreshToken!: string | null;

  @Column()
  cpf: string;

  @Column()
  credit: number;

  @Column()
  isGuest: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
