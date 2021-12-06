import { IsBoolean, IsOptional } from "class-validator";
export class BoughtPersonalizationBuyDTO {
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;
}