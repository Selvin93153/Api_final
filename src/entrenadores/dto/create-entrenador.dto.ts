import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateEntrenadorDto {
   
    @IsString()
    @IsNotEmpty()
    nombre_completo: string;

    @IsInt()
    @IsNotEmpty()
    edad: number;

    @IsString()
    @IsNotEmpty()
    sexo: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsNotEmpty()
    especialidad: string;

    @IsInt()
    @IsNotEmpty()
    años_experiencia: number;
}
