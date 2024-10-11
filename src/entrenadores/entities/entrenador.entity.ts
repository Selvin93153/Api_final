import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entrenadores')
export class Entrenador {
    @PrimaryGeneratedColumn()
    entrenador_id: number;

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinColumn({ name: 'usuario_id' }) // Nombre de la columna en la tabla de entrenadores
    usuario: Usuario;

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
}
