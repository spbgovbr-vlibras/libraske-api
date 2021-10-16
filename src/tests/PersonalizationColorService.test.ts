import AppError from "../errors/AppError";
import { createConnection, getConnection } from "typeorm";
import PersonalizationColorRepository from "../repositories/PersonalizationColorRepository";
import PersonalizationColor from "../models/PersonalizationColor";
import PersonalizationColorService from "../services/PersonalizationColorService";
import PersonalizationGroup from "../models/PersonalizationGroup";
import Personalization from "../models/Personalization";
import User from "../models/User";
import DataGenerator from "../utils/DataGenerator";


jest.mock('../services/PersonalizationColorService')

const MockedPersonalizationColorService = PersonalizationColorService as jest.Mocked<typeof PersonalizationColorService>;

describe('Personalization Color Service', () => {

  beforeAll(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PersonalizationColor, PersonalizationGroup, Personalization, User],
      synchronize: true,
      logging: false,
    })
  })

  afterAll(() => {
    const connection = getConnection();
    return connection.close();
  })

  it.only('should find all colors personalization', async () => {
    const user: User = {
      id: 1,
      cpf: DataGenerator.getUnformattedCpf(),
      name: DataGenerator.getFirstName(),
      credit: 0,
      email: DataGenerator.getEmail(),
      isGuest: false,
      profilePhoto: null,
      refreshToken: null,
      created_at: new Date(),
      updated_at: new Date()
    }
    const personalization: Personalization = { id: 1, name: "Teste", description: "Teste", user_id: 1, user };
    const personalizationGroup: PersonalizationGroup = { id: 1, name: "Teste", personalization_id: 1, price: 500, personalization }
    const data: PersonalizationColor = { id: 1, code: "#123123", isDefault: false, personalization_group_id: 1, personalizationGroup };
    const data1: PersonalizationColor = { id: 2, code: "#321321", isDefault: false, personalization_group_id: 1, personalizationGroup };

    MockedPersonalizationColorService.findAll.mockResolvedValue([data, data1]);

    const allPersonalizations = await PersonalizationColorService.findAll();

    expect(allPersonalizations.length).toBe(2);
    expect(allPersonalizations[0].code).toBe("#123123");
    expect(allPersonalizations[1].code).toBe("#321321");
  });

})