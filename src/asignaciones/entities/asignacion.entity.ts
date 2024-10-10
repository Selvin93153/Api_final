import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asignaciones')
export class Asignacion {
    @PrimaryGeneratedColumn()
    asignacion_id: number;

    @Column()
    cliente_id: number;

    @Column()
    entrenador_id: number;

    @Column({ type: 'date' })
    fecha_asignacion: Date;

    @Column()
    asignado_por: number;
}
