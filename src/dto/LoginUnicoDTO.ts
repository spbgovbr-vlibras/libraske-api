import { IsString, IsNotEmpty } from "class-validator";
import { Trim } from "class-sanitizer";

export class LoginUnicoDTO {
  @IsString()
  @Trim()
  public code: string;

  @IsString()
  @Trim()
  @IsNotEmpty()
  public redirectUri: string;
}