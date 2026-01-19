import { faker } from '@faker-js/faker';
import CPF from 'cpf';

export default class DataGenerator {
  static getUUID = () => {
    return faker.string.uuid();
  }

  static getFirstName = () => {
    return faker.person.firstName();
  }

  static getEmail = () => {
    return faker.internet.email();
  }

  static getUrl = () => {
    return faker.internet.url();
  }

  static getInteger = (): number => {
    return faker.number.int();
  }

  static getFormattedCpf = () => {
    return CPF.generate();
  }

  static getUnformattedCpf = () => {
    return DataGenerator.getFormattedCpf().replace(/[.]/g, '').replace('-', '');
  }

  static getRandomWord = () => {
    return faker.word.sample();
  }

  static getSongGenre = () => {
    return faker.music.genre();
  }

  static getRandomFilePath = () => {
    return faker.system.filePath();
  }
}
