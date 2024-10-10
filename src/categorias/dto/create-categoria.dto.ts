import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    nombre_categoria: string;
}
