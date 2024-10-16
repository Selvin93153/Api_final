import { Usuario } from 'src/usuarios/entities/usuario.entity';
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

    @Column({ type: 'char', length: 1 })
    sexo: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    telefono?: string;

    @Column({ type: 'varchar', length: 100 })
    especialidad: string;

    @Column({ type: 'int' })
    años_experiencia: number;

    @OneToMany(() => Asignacion, (asignacion) => asignacion.entrenador)
    asignaciones: Asignacion[];
}