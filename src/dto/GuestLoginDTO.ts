import { IsString, MaxLength, MinLength, isInt } from "class-validator";
import { Trim } from "class-sanitizer";

export class GuestLoginDTO {

    @IsString()
    @Trim()
    @MinLength(2, { message: "O nome deve possuir pelo menos 2 caracteres" })
    @MaxLength(20, { message: "O nome pode possuir no máximo 20 caracteres" })
    public userName: string;
}