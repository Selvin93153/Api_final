import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn()
    rol_id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre_rol: string;
}
