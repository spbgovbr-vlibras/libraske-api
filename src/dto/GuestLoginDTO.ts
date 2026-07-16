import { IsString, Matches, MaxLength, MinLength, isInt } from "class-validator";
import { Trim } from "class-sanitizer";

// eslint-disable-next-line no-control-regex
const NO_CONTROL_CHARACTERS = /^[^\x00-\x1F\x7F]*$/;

export class GuestLoginDTO {
  @IsString()
  @Trim()
  @MinLength(2, { message: "O nome deve possuir pelo menos 2 caracteres" })
  @MaxLength(20, { message: "O nome pode possuir no máximo 20 caracteres" })
  @Matches(NO_CONTROL_CHARACTERS, { message: "O nome não pode conter caracteres de controle" })
  public guestName: string;
}