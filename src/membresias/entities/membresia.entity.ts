import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('membresias')
export class Membresia {
    @PrimaryGeneratedColumn()
    membresia_id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre_membresia: string;

    @Column({ type: 'text', nullable: true })
    beneficios?: string;

    @Column({ type: 'enum', enum: ['Activa', 'Vencida'] })
    estado_membresia: 'Activa' | 'Vencida';

    @Column({ type: 'date', nullable: true })
    fecha_inicio?: Date;

    @Column({ type: 'date', nullable: true })
    fecha_fin?: Date;
}
