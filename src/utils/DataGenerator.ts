import { randomBytes, randomUUID } from 'crypto';
import CPF from 'cpf';

const pick = <T>(items: readonly T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const FIRST_NAMES = [
  'Ana',
  'Bianca',
  'Caio',
  'Daniel',
  'Eduarda',
  'Felipe',
  'Gabriela',
  'Helena',
  'Igor',
  'Joana',
  'Kauê',
  'Larissa',
  'Marina',
  'Nicolas',
  'Otávio',
  'Paula',
  'Rafael',
  'Sofia',
  'Thiago',
  'Vitor'
] as const;

const WORDS = [
  'aurora',
  'brisa',
  'citrus',
  'duna',
  'eclipse',
  'fogo',
  'galho',
  'horizonte',
  'ilha',
  'jade',
  'kiwi',
  'luz',
  'mosaico',
  'nexo',
  'onda',
  'polen',
  'quasar',
  'rio',
  'serra',
  'trilha'
] as const;

const SONG_GENRES = [
  'Pop',
  'Rock',
  'MPB',
  'Forró',
  'Sertanejo',
  'Pagode',
  'Gospel',
  'Hip Hop',
  'Clássica',
  'Eletrônica'
] as const;

const FILE_FOLDERS = ['images', 'songs', 'videos', 'uploads', 'tmp'] as const;
const FILE_EXTENSIONS = ['gif', 'png', 'mp4', 'mp3', 'json'] as const;
const EMAIL_DOMAINS = ['example.com', 'libraske.com', 'mailinator.com', 'test.dev'] as const;

const randomInt = () => randomBytes(2).readUInt16BE(0);

export default class DataGenerator {
  static getUUID = () => {
    return randomUUID();
  };

  static getFirstName = () => {
    return pick(FIRST_NAMES);
  };

  static getEmail = () => {
    const localPart = `${DataGenerator.getFirstName().toLowerCase()}${randomInt()}`;
    return `${localPart}@${pick(EMAIL_DOMAINS)}`;
  };

  static getUrl = () => {
    return `https://api.${pick(EMAIL_DOMAINS).replace('.com', '.dev')}/${pick(WORDS)}/${randomInt()}`;
  };

  static getInteger = (): number => {
    return randomInt();
  };

  static getFormattedCpf = () => {
    return CPF.generate();
  };

  static getUnformattedCpf = () => {
    return DataGenerator.getFormattedCpf().replace(/[.]/g, '').replace('-', '');
  };

  static getRandomWord = () => {
    return pick(WORDS);
  };

  static getSongGenre = () => {
    return pick(SONG_GENRES);
  };

  static getRandomFilePath = () => {
    const folder = pick(FILE_FOLDERS);
    const fileName = `${pick(WORDS)}-${randomInt()}.${pick(FILE_EXTENSIONS)}`;
    return `/tmp/${folder}/${fileName}`;
  };
}
