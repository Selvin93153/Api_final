import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entrenador } from 'src/entrenadores/entities/entrenador.entity';

@Entity('asignaciones')
export class Asignacion {
    @PrimaryGeneratedColumn()
    asignacion_id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.asignaciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Entrenador, (entrenador) => entrenador.asignaciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'entrenador_id' })
    entrenador: Entrenador;

    @Column({ type: 'date' })
    fecha_asignacion: Date;
}
