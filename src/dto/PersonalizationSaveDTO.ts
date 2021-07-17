import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive, Min, } from "class-validator";
import { Trim } from "class-sanitizer";

export class PersonalizationSaveDTO {

    @IsString()
    @Trim()
    @IsNotEmpty()
    public name: string;

    @IsString()
    public description: string;

    @IsInt()
    @Min(0)
    public price: number;

}