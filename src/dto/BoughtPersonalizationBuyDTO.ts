import { IsBoolean } from "class-validator";
export class BoughtPersonalizationBuyDTO {

    @IsBoolean()
    public isActive: boolean;

}