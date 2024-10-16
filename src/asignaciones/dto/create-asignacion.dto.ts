import { IsInt, IsNotEmpty, IsDate } from 'class-validator';

export class CreateAsignacionDto {
    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

    @IsInt()
    @IsNotEmpty()
    entrenador_id: number;

    @IsNotEmpty()
    fecha_asignacion: Date;
}
