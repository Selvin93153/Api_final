import {  IsNotEmpty,  IsString, IsDate, IsInt } from 'class-validator';

export class CreateControlDto {
    @IsInt()
    @IsNotEmpty()
    peso_inicial: number;

    @IsInt()
    @IsNotEmpty()
    peso_actual: number;

    @IsString()
    @IsNotEmpty()
    altura: string;

    
    @IsNotEmpty()
    fecha: Date;

    @IsInt()
    @IsNotEmpty()
    usuario_id: number; // Este campo será usado para la relación
}
