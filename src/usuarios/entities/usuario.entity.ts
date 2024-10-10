import { Entrenador } from 'src/entrenadores/entities/entrenador.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @Column({ type: 'varchar', length: 50 })
    apellido: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    contraseña: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    telefono?: string;

    @Column({ type: 'int', nullable: true })
    rol_id?: number;  // Asumiendo que es un ID de rol

    @OneToMany(() => Entrenador, (entrenador) => entrenador.usuario)
    entrenadores: Entrenador[];

    // Otros campos pueden ir aquí según sea necesario
}
