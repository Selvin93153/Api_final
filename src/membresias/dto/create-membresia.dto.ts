import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMembresiaDto {
    @IsString()
    @IsNotEmpty()
    nombre_membresia: string;

    @IsString()
    @IsOptional()
    beneficios?: string;

    @IsEnum(['Activa', 'Vencida'])
    estado_membresia: 'Activa' | 'Vencida';

    @IsOptional()
    fecha_inicio?: Date;

    @IsOptional()
    fecha_fin?: Date;
}
