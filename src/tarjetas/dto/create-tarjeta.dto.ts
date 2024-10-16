import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateTarjetaDto {
    @IsNumber()
    usuario_id: number;

    @IsString() // Cambiado a string para el cifrado
    @IsNotEmpty()
    numero_tarjeta: string; 


    @IsNotEmpty()
    fecha_expiracion: Date;

    @IsString()
    @IsNotEmpty()
    nombre_titular: string;

    @IsString() // Cambiado a string para el cifrado
    @IsNotEmpty()
    cvv: string; 
}
