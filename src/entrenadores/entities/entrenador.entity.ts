
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asignacion } from 'src/asignaciones/entities/asignacion.entity';

@Entity('entrenadores')
export class Entrenador {
    @PrimaryGeneratedColumn()
    entrenador_id: number;


    @Column({ type: 'varchar', length: 100 })
    nombre_completo: string;

    @Column({ type: 'int' })
    edad: number;

    @Column({ type: 'varchar', length: 10, nullable: false }) // Asegúrate de que nullable esté en false
    sexo: string;
    
    @Column({ type: 'varchar', length: 10, nullable: false }) // Asegúrate de que nullable esté en false
    telefono: string;
    
    

    @Column({ type: 'varchar', length: 100 })
    especialidad: string;

    @Column({ type: 'int' })
    años_experiencia: number;

    @OneToMany(() => Asignacion, (asignacion) => asignacion.entrenador)
    asignaciones: Asignacion[];
}