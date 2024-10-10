import {
    IsEmail,
    IsMobilePhone,
    IsOptional,
    IsString,
    IsNotEmpty,
    MinLength
} from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    contraseña: string;

    @IsMobilePhone()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsNotEmpty()
    rol_id: number;  // Asumiendo que es un ID de rol
}
