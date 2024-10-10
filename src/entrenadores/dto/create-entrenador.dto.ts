import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEntrenadorDto {

    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

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
    @IsOptional()
    especialidad?: string;

    @IsInt()
    @IsOptional()
    años_experiencia?: number;
}
