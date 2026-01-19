import { AppDataSource } from '../database';
import AppError from '../errors/AppError';
import Personalization from '../models/Personalization';
import PersonalizationColor from '../models/PersonalizationColor';
import PersonalizationGroup from '../models/PersonalizationGroup';
import User from '../models/User';
import PersonalizationColorService from '../services/PersonalizationColorService';
import DataGenerator from '../utils/DataGenerator';
import {
  clearDatabaseEntities,
  closeTestDatabase,
  initializeTestDatabase,
} from './helpers/testDatabase';

const createUser = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create({
    name: DataGenerator.getFirstName(),
    email: DataGenerator.getEmail(),
    cpf: DataGenerator.getUnformattedCpf(),
    profilePhoto: DataGenerator.getUrl(),
    refreshToken: null,
    credit: 0,
    isGuest: false,
  });

  return userRepository.save(user);
};

const createPersonalizationTree = async () => {
  const personalizationRepository = AppDataSource.getRepository(Personalization);
  const personalizationGroupRepository = AppDataSource.getRepository(
    PersonalizationGroup,
  );
  const personalizationColorRepository = AppDataSource.getRepository(
    PersonalizationColor,
  );

  const user = await createUser();

  const personalization = personalizationRepository.create({
    user_id: user.id,
    user,
    name: DataGenerator.getFirstName(),
    description: DataGenerator.getRandomWord(),
  });
  await personalizationRepository.save(personalization);

  const group = personalizationGroupRepository.create({
    name: `Grupo ${DataGenerator.getFirstName()}`,
    personalization_id: personalization.id,
    personalization,
    price: DataGenerator.getInteger(),
  });
  await personalizationGroupRepository.save(group);

  const firstColor = personalizationColorRepository.create({
    code: '#123123',
    isDefault: true,
    personalization_group_id: group.id,
    personalizationGroup: group,
  });

  const secondColor = personalizationColorRepository.create({
    code: '#321321',
    isDefault: false,
    personalization_group_id: group.id,
    personalizationGroup: group,
  });

  await personalizationColorRepository.save(firstColor);
  await personalizationColorRepository.save(secondColor);

  return { personalization, group, colors: [firstColor, secondColor] };
};

describe('Personalization Color Service', () => {
  beforeAll(async () => {
    await initializeTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  afterEach(async () => {
    await clearDatabaseEntities([
      PersonalizationColor,
      PersonalizationGroup,
      Personalization,
      User,
    ]);
  });

  it('should list all personalization colors', async () => {
    const { colors } = await createPersonalizationTree();

    const allColors = await PersonalizationColorService.findAll();

    expect(allColors).toHaveLength(colors.length);
    expect(allColors.map(color => color.code)).toEqual(
      expect.arrayContaining(colors.map(color => color.code)),
    );
  });

  it('should find colors by personalization group id', async () => {
    const { group } = await createPersonalizationTree();

    const colors = await PersonalizationColorService.findAllByPersonalizationId(
      group.id,
    );

    expect(colors).toHaveLength(2);
    colors.forEach(color => {
      expect(color.personalization_group_id).toBe(group.id);
    });
  });

  it('should find all colors by personalization id through query', async () => {
    const { personalization } = await createPersonalizationTree();

    const colors = await PersonalizationColorService.findAllColorsByPersonalization(
      personalization.id,
    );

    expect(colors).toHaveLength(2);
  });

  it('should find a color by id', async () => {
    const { colors } = await createPersonalizationTree();

    const color = await PersonalizationColorService.findOneById(colors[0].id);

    expect(color.id).toBe(colors[0].id);
    expect(color.code).toBe(colors[0].code);
  });

  it('should throw when color is not found', async () => {
    await expect(
      PersonalizationColorService.findOneById(DataGenerator.getInteger()),
    ).rejects.toBeInstanceOf(AppError);
  });
});