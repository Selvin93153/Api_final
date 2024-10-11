import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateEntrenadorDto {
    @IsInt()
    @IsNotEmpty()
    usuario_id: number; // Referencia al ID del usuario

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
