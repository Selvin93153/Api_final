import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity'; // Asegúrate de tener la ruta correcta

@Entity('entrenadores')
export class Entrenador {
    @PrimaryGeneratedColumn()
    entrenador_id: number;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.entrenadores, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column({ type: 'varchar', length: 100 })
    nombre_completo: string;

    @Column({ type: 'int' })
    edad: number;

    @Column({ type: 'char', length: 1 })
    sexo: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    telefono?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    especialidad?: string;

    @Column({ type: 'int', nullable: true })
    años_experiencia?: number;
}
