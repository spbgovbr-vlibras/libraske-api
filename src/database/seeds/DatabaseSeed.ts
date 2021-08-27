import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import environment from '../../environment/environment';
import Personalization from '../../models/Personalization';
import PersonalizationColor from '../../models/PersonalizationColor';
import PersonalizationGroup from '../../models/PersonalizationGroup';
import User from '../../models/User';
import '../index';

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: environment.TYPEORM_HOST,
  port: parseInt(environment.TYPEORM_PORT),
  username: environment.TYPEORM_USERNAME,
  password: environment.TYPEORM_PASSWORD,
  database: environment.TYPEORM_DATABASE,
  entities: [
    User,
    Personalization,
    PersonalizationGroup,
    PersonalizationColor,
  ],
  synchronize: false,
  logging: environment.TYPEORM_LOGGING === 'true',
};

console.log(options);

async function run() {
  const connection = await createConnection(options);
  const userRepository = connection.getRepository(User);
  const personalizationRepository = connection.getRepository(Personalization);
  const personalizationGroupRepository =
    connection.getRepository(PersonalizationGroup);
  const personalizationColorRepository =
    connection.getRepository(PersonalizationColor);

  const count = await userRepository.count();

  if (count > 0) {
    console.log("Tabela já foi populada com dados.");
    return
  }

  /*
   *   Usuário padrão
   */
  await userRepository.save({
    id: 1,
    cpf: '12345678900',
    name: 'SYSTEM',
    email: 'system@libraske.ufpb.br',
    profilePhoto: '',
    refreshToken: null,
    credit: 0,
  });

  /*
   *   Grupos de personalização
   */

  await personalizationRepository.save({
    id: 1,
    name: 'pele',
    user_id: 1,
    description: '',
    price: 500,
  });
  await personalizationRepository.save({
    id: 2,
    name: 'olhos',
    user_id: 1,
    description: '',
    price: 500,
  });

  await personalizationRepository.save({
    id: 3,
    name: 'cabelo',
    user_id: 1,
    description: '',
    price: 500,
  });

  await personalizationRepository.save({
    id: 4,
    name: 'camisa',
    user_id: 1,
    description: '',
    price: 500,
  });

  await personalizationRepository.save({
    id: 5,
    name: 'calça',
    user_id: 1,
    description: '',
    price: 500,
  });

  await personalizationGroupRepository.save({ name: 'Grupo Pele 1', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 2', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 3', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 4', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 5', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 6', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 7', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 8', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 9', personalization_id: 1, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Pele 10', personalization_id: 1, price: 0 });

  await personalizationGroupRepository.save({ name: 'Grupo Olhos 1', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 2', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 3', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 4', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 5', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 6', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 7', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 8', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 9', personalization_id: 2, price: 0 });
  await personalizationGroupRepository.save({ name: 'Grupo Olhos 10', personalization_id: 2, price: 0 });

  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 1', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 2', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 3', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 4', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 5', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 6', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 7', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 8', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 9', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 10', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 11', personalization_id: 3, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Cabelo 12', personalization_id: 3, price: 500 });

  await personalizationGroupRepository.save({ name: 'Grupo Camisa 1', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 2', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 3', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 4', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 5', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 6', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 7', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 8', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 9', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 10', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 11', personalization_id: 4, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Camisa 12', personalization_id: 4, price: 500 });

  await personalizationGroupRepository.save({ name: 'Grupo Calça 1', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 2', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 3', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 4', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 5', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 6', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 7', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 8', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 9', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 10', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 11', personalization_id: 5, price: 500 });
  await personalizationGroupRepository.save({ name: 'Grupo Calça 12', personalization_id: 5, price: 500 });


  // Cores da Pele
  await personalizationColorRepository.save({ personalization_group_id: 1, code: '#FFF4E1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 1, code: '#E5CFAB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 1, code: '#D7BD91', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 1, code: '#DFB56F', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 1, code: '#A98954', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 2, code: '#F0DAC4', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 2, code: '#E5C8AB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 2, code: '#D7B491', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 2, code: '#DFA66F', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 2, code: '#A97E54', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 3, code: '#EBCCBC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 3, code: '#E5BEAB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 3, code: '#D7A891', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 3, code: '#DF946F', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 3, code: '#A97054', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 4, code: '#CDA262', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 4, code: '#9A7741', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 4, code: '#8B6A38', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 4, code: '#725427', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 4, code: '#614927', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 5, code: '#CD9162', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 5, code: '#9A6841', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 5, code: '#8B5C38', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 5, code: '#724827', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 5, code: '#614027', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 6, code: '#CD7F62', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 6, code: '#9A5A41', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 6, code: '#8B4E38', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 6, code: '#724827', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 6, code: '#613627', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 7, code: '#513512', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 7, code: '#483216', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 7, code: '#372610', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 7, code: '#312412', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 7, code: '#281E11', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 8, code: '#512E12', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 8, code: '#482C16', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 8, code: '#372110', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 8, code: '#312012', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 8, code: '#281B11', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 9, code: '#512312', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 9, code: '#482416', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 9, code: '#371B10', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 9, code: '#311B12', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 9, code: '#281811', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 10, code: '#31140B', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 10, code: '#2B140D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 10, code: '#210F0A', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 10, code: '#1D100B', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 10, code: '#180E0B', isDefault: false });

  // Cores dos Olhos

  await personalizationColorRepository.save({ personalization_group_id: 11, code: '#B77C28', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 11, code: '#935D12', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 11, code: '#6D3900', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 11, code: '#4B2200', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 11, code: '#2F0C00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 12, code: '#66411D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 12, code: '#4E2D0E', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 12, code: '#361700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 12, code: '#260D00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 12, code: '#170400', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 13, code: '#B7A228', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 13, code: '#937F12', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 13, code: '#6D5600', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 13, code: '#4B3600', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 13, code: '#2F1900', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 14, code: '#8EB728', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 14, code: '#6E9312', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 14, code: '#556D00', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 14, code: '#404B00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 14, code: '#2F2D00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 15, code: '#45B728', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 15, code: '#2C9312', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 15, code: '#1C6D00', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 15, code: '#194B00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 15, code: '#182F00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 16, code: '#28B76B', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 16, code: '#12934E', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 16, code: '#006D2C', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 16, code: '#004B19', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 16, code: '#002F07', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 17, code: '#28B7AB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 17, code: '#129388', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 17, code: '#006D5D', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 17, code: '#004B3B', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 17, code: '#002F1C', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 18, code: '#2774AF', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 18, code: '#11578C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 18, code: '#004168', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 18, code: '#003248', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 18, code: '#00272C', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 19, code: '#2730AF', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 19, code: '#111A8C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 19, code: '#000D68', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 19, code: '#000E48', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 19, code: '#00112C', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 20, code: '#4D4D4D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 20, code: '#3C3C3C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 20, code: '#292929', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 20, code: '#1A1A1A', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 20, code: '#000000', isDefault: false });

  // Cores do Cabelo

  await personalizationColorRepository.save({ personalization_group_id: 21, code: '#FFC3C6', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 21, code: '#FF434C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 21, code: '#FF1E1E', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 21, code: '#B10000', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 21, code: '#550000', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 22, code: '#FFD6C3', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 22, code: '#FF7F43', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 22, code: '#FF5100', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 22, code: '#B14100', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 22, code: '#551F00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 23, code: '#EAD1A3', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 23, code: '#F8B840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 23, code: '#F7A100', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 23, code: '#AC7800', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 23, code: '#523A00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 24, code: '#CBDB84', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 24, code: '#D6F840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 24, code: '#C9F700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 24, code: '#84AC00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 24, code: '#3F5200', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 25, code: '#B6EDA9', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 25, code: '#62F840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 25, code: '#2DF700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 25, code: '#17AC00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 25, code: '#0B5200', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 26, code: '#9EE7C4', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 26, code: '#73FFBC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 26, code: '#00F781', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 26, code: '#00AC61', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 26, code: '#00522F', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 27, code: '#AFDDE1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 27, code: '#40E8F8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 27, code: '#00E2F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 27, code: '#0095AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 27, code: '#004752', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 28, code: '#A1ABE1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 28, code: '#405EF8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 28, code: '#0029F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 28, code: '#0014AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 28, code: '#000A52', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 29, code: '#CDA6E7', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 29, code: '#AF40F8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 29, code: '#9500F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 29, code: '#7000AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 29, code: '#360052', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 30, code: '#F0BEE2', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 30, code: '#FF5ED1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 30, code: '#F700B1', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 30, code: '#AC0072', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 30, code: '#520037', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 31, code: '#F6BACD', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 31, code: '#F63F79', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 31, code: '#F5004D', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 31, code: '#AA002D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 31, code: '#520016', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 32, code: '#DBDBDB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 32, code: '#9C9C9C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 32, code: '#676767', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 32, code: '#3D3D3D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 32, code: '#191919', isDefault: false });

  // Cores da Camisa

  await personalizationColorRepository.save({ personalization_group_id: 33, code: '#FFC3C6', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 33, code: '#FF434C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 33, code: '#FF1E1E', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 33, code: '#B10000', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 33, code: '#550000', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 34, code: '#FFD6C3', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 34, code: '#FF7F43', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 34, code: '#FF5100', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 34, code: '#B14100', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 34, code: '#551F00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 35, code: '#EAD1A3', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 35, code: '#F8B840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 35, code: '#F7A100', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 35, code: '#AC7800', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 35, code: '#523A00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 36, code: '#CBDB84', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 36, code: '#D6F840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 36, code: '#C9F700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 36, code: '#84AC00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 36, code: '#3F5200', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 37, code: '#B6EDA9', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 37, code: '#62F840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 37, code: '#2DF700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 37, code: '#17AC00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 37, code: '#0B5200', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 38, code: '#9EE7C4', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 38, code: '#73FFBC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 38, code: '#00F781', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 38, code: '#00AC61', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 38, code: '#00522F', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 39, code: '#AFDDE1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 39, code: '#40E8F8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 39, code: '#00E2F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 39, code: '#0095AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 39, code: '#004752', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 40, code: '#A1ABE1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 40, code: '#405EF8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 40, code: '#0029F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 40, code: '#0014AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 40, code: '#000A52', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 41, code: '#CDA6E7', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 41, code: '#AF41F8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 41, code: '#9500F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 41, code: '#7000AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 41, code: '#360052', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 42, code: '#F0BEE2', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 42, code: '#FF5ED1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 42, code: '#F700B1', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 42, code: '#AC0072', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 42, code: '#520037', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 43, code: '#F6BACD', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 43, code: '#F63F79', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 43, code: '#F5004D', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 43, code: '#AA002D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 43, code: '#520016', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 44, code: '#DBDBDB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 44, code: '#9C9C9C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 44, code: '#676767', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 44, code: '#3D3D3D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 44, code: '#191919', isDefault: false });

  // Cores da Calça

  await personalizationColorRepository.save({ personalization_group_id: 45, code: '#FFC3C6', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 45, code: '#FF434C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 45, code: '#FF1E1E', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 45, code: '#B10000', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 45, code: '#550000', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 46, code: '#FFD6C3', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 46, code: '#FF7F43', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 46, code: '#FF5100', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 46, code: '#B14100', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 46, code: '#551F00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 47, code: '#EAD1A3', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 47, code: '#F8B840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 47, code: '#F7A100', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 47, code: '#AC7800', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 47, code: '#523A00', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 48, code: '#CBDB84', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 48, code: '#D6F840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 48, code: '#C9F700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 48, code: '#84AC00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 48, code: '#3F5200', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 49, code: '#B6EDA9', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 49, code: '#62F840', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 49, code: '#2DF700', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 49, code: '#17AC00', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 49, code: '#0B5200', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 50, code: '#9EE7C4', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 50, code: '#73FFBC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 50, code: '#00F781', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 50, code: '#00AC61', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 50, code: '#00522F', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 51, code: '#AFDDE1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 51, code: '#40E8F8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 51, code: '#00E2F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 51, code: '#0095AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 51, code: '#004752', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 52, code: '#A1ABE1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 52, code: '#405EF8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 52, code: '#0029F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 52, code: '#0014AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 52, code: '#000A52', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 53, code: '#CDA6E7', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 53, code: '#AF40F8', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 53, code: '#9500F7', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 53, code: '#7000AC', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 53, code: '#360052', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 54, code: '#F0BEE2', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 54, code: '#FF5ED1', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 54, code: '#F700B1', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 54, code: '#AC0072', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 54, code: '#520037', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 55, code: '#F6BACD', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 55, code: '#F63F79', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 55, code: '#F5004D', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 55, code: '#AA002D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 55, code: '#520016', isDefault: false });

  await personalizationColorRepository.save({ personalization_group_id: 56, code: '#DBDBDB', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 56, code: '#9C9C9C', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 56, code: '#676767', isDefault: true });
  await personalizationColorRepository.save({ personalization_group_id: 56, code: '#3D3D3D', isDefault: false });
  await personalizationColorRepository.save({ personalization_group_id: 56, code: '#191919', isDefault: false });


}

run();
