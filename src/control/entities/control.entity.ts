import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('control')
export class Control {
    @PrimaryGeneratedColumn()
    peso_id: number;

    @Column({ type: 'int' })
    peso_inicial: number;

    @Column({ type: 'int'})
    peso_actual: number;

    @Column({ type: 'varchar' })
    altura: string;

    @Column({ type: 'date' })
    fecha: Date;
    
    @ManyToOne(() => Usuario, (usuario) => usuario.controles)
    @JoinColumn({ name: 'usuario_id' }) // Especifica el nombre de la columna
    usuario: Usuario;
}
