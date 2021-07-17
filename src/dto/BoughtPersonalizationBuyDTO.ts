import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive, Min, IsBoolean, IsHexadecimal, } from "class-validator";
import { Trim } from "class-sanitizer";

export class BoughtPersonalizationBuyDTO {

    @IsString()
    @IsHexadecimal()
    public color: string;

    @IsBoolean()
    public isActive: boolean;

}