import { IsString, Matches, MaxLength, MinLength, isInt } from "class-validator";
import { Trim } from "class-sanitizer";

// Letras (inclusive acentuadas), numeros e espacos. Bloqueia por completo
// qualquer caractere de controle (\x00-\x1F, \x7F) e qualquer caractere
// especial de HTML/JS (<, >, &, =, aspas, parenteses, etc.), prevenindo
// XSS armazenado sem depender de uma etapa de sanitizacao separada.
const ALLOWED_GUEST_NAME_CHARACTERS = /^[a-zA-Z0-9À-ÖØ-öø-ÿ ]*$/;

export class GuestLoginDTO {
  @IsString()
  @Trim()
  @MinLength(2, { message: "O nome deve possuir pelo menos 2 caracteres" })
  @MaxLength(20, { message: "O nome pode possuir no máximo 20 caracteres" })
  @Matches(ALLOWED_GUEST_NAME_CHARACTERS, { message: "O nome só pode conter letras, números e espaços" })
  public guestName: string;
}