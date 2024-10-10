import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAsignacionDto {
    @IsInt()
    @IsNotEmpty()
    cliente_id: number;

    @IsInt()
    @IsNotEmpty()
    entrenador_id: number;

    @IsDate()
    @IsNotEmpty()
    fecha_asignacion: Date;

    @IsInt()
    @IsNotEmpty()
    asignado_por: number;
}
