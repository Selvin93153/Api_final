import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateControlPesoDto {


  @IsNumber()
  @IsPositive()
  peso_inicial: number;

  @IsNumber()
  @IsPositive()
  peso_actual: number;

  @IsNumber()
  @IsPositive()
  altura: number;

  @IsOptional()
  fecha?: Date;
}
