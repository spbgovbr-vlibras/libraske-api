import { Trim } from 'class-sanitizer';
import { IsString, IsNotEmpty, MaxLength, Matches } from 'class-validator';

// Permite letras (com acentuação), números, espaços e pontuação comum.
// Bloqueia explicitamente <, >, & e outros caracteres.
const SAFE_TEXT_REGEX = new RegExp('^[\\p{L}\\p{N}\\s.,!?():;\'"\\-/]*$', 'u');
const SAFE_TEXT_MESSAGE =
  'O campo não pode conter os caracteres <, >, & ou outras tags HTML';

export class SongCreateDTO {
  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'O nome da música é obrigatório' })
  @MaxLength(100, {
    message: 'O nome da música pode possuir no máximo 100 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public name: string;

  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'Os cantores são obrigatórios' })
  @MaxLength(150, {
    message: 'O campo cantores pode possuir no máximo 150 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public singers: string;

  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MaxLength(1000, {
    message: 'A descrição pode possuir no máximo 1000 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public description: string;

  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'A frase de treinamento 1 é obrigatória' })
  @MaxLength(300, {
    message: 'A frase de treinamento 1 pode possuir no máximo 300 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public trainingPhrase1: string;

  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'A frase de treinamento 2 é obrigatória' })
  @MaxLength(300, {
    message: 'A frase de treinamento 2 pode possuir no máximo 300 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public trainingPhrase2: string;

  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'A frase de treinamento 3 é obrigatória' })
  @MaxLength(300, {
    message: 'A frase de treinamento 3 pode possuir no máximo 300 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public trainingPhrase3: string;

  @IsString()
  @Trim()
  @IsNotEmpty({ message: 'A frase de treinamento 4 é obrigatória' })
  @MaxLength(300, {
    message: 'A frase de treinamento 4 pode possuir no máximo 300 caracteres',
  })
  @Matches(SAFE_TEXT_REGEX, { message: SAFE_TEXT_MESSAGE })
  public trainingPhrase4: string;
}

export default SongCreateDTO;
