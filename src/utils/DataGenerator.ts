import faker from 'faker';
import CPF from 'cpf';

export default class DataGenerator {
  static getUUID = () => {
    return faker.datatype.uuid()
  }

  static getFirstName = () => {
    return faker.name.firstName()
  }

  static getEmail = () => {
    return faker.internet.email();
  }

  static getUrl = () => {
    return faker.internet.url();
  }

  static getInteger = (): number => {
    return faker.datatype.number();
  }

  static getFormattedCpf = () => {
    return CPF.generate();
  }

  static getUnformattedCpf = () => {
    return DataGenerator.getFormattedCpf().replace(/[.]/g, '').replace('-', '');
  }

  static getRandomWord = () => {
    return faker.random.word();
  }

  static getSongGenre = () => {
    return faker.music.genre();
  }

  static getRandomFilePath = () => {
    return faker.system.filePath();
  }
}
