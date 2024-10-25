import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';


@Entity()
export class ControlPeso {
  @PrimaryGeneratedColumn()
  peso_id: number;

  @Column('decimal')
  peso_inicial: number;

  @Column('decimal')
  peso_actual: number;

  @Column('decimal')
  altura: number;

  @Column({ type: 'date', nullable: true })
  fecha?: Date;

  // Relación uno a uno con la tabla usuarios
  @OneToOne(() => Usuario, (usuario) => usuario.controlPeso)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
