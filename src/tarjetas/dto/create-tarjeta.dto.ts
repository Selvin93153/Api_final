import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateTarjetaDto {
    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(16)
    numero_tarjeta: string;

    @IsString()
    @IsNotEmpty()
    nombre_titular: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    cvv: string;

    @IsString()
    @IsNotEmpty()
    expiracion: string;
}
