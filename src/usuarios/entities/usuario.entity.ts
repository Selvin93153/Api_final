import { Entrenador } from 'src/entrenadores/entities/entrenador.entity';
import { Rol } from 'src/roles/entities/roles.entity';  
import { Membresia } from 'src/membresias/entities/membresia.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ControlPeso } from 'src/control-peso/entities/control-peso.entity';
import { Tarjeta } from 'src/tarjetas/entities/tarjeta.entity';
import { Asignacion } from 'src/asignaciones/entities/asignacion.entity';

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

    // Relación con la tabla de roles
    @ManyToOne(() => Rol, { nullable: false }) 
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;

    // Relación con la tabla de membresías
    @ManyToOne(() => Membresia, { nullable: true })
    @JoinColumn({ name: 'membresia_id' })
    membresia: Membresia;

    @OneToMany(() => Asignacion, (asignacion) => asignacion.usuario)
    asignaciones: Asignacion[];

    @OneToOne(() => Tarjeta, (tarjeta) => tarjeta.usuario)
    tarjeta: Tarjeta; // Relación uno a uno con la tabla tarjetas

    @OneToOne(() => ControlPeso, (controlPeso) => controlPeso.usuario)
  controlPeso: ControlPeso;

  
}
