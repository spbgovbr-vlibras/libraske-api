import { Repository } from 'typeorm';
import User from '../models/User';
import { AppDataSource } from '../database';

interface IUsersRepository {
  findOneById(id: number): Promise<User | undefined>;
  findOneByCpf(cpf: string): Promise<User | undefined>;
  getInstance(): Repository<User>;
}

class UsersRepository implements IUsersRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) ?? undefined;
  }

  async findOneByCpf(cpf: string): Promise<User | undefined> {
    return (await this.ormRepository.findOne({ where: { cpf } })) ?? undefined;
  }

  async activateColor(userId: number, columnName: string, colorCode: string) {
    const query = `
    update users
    set ${columnName} = '${colorCode}'
    where users.id = ${userId}
   `
    await this.getInstance().query(query);
  }

  getInstance(): Repository<User> {
    return this.ormRepository;
  }
}

export default new UsersRepository();