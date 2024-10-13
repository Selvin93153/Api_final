import {
    IsEmail,
    IsMobilePhone,
    IsOptional,
    IsString,
    IsNotEmpty,
    MinLength,
    IsInt
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

    @IsInt()
    @IsNotEmpty()
    rol_id: number;  
    
    @IsInt()
    @IsOptional()
    membresia_id?: number;//  un ID de rol
}
