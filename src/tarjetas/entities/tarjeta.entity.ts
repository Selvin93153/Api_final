import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Tarjeta {
  @PrimaryGeneratedColumn()
  tarjeta_id: number;

  @Column('text')
  numero_tarjeta: string;

  @Column('text')
  nombre_titular: string;

  @Column('text')
  cvv: string;

  @Column('text')
  expiracion: string;

  // Cifrar los datos sensibles antes de insertarlos
  @BeforeInsert()
  async encryptSensitiveData() {
    this.numero_tarjeta = await bcrypt.hash(this.numero_tarjeta, 10);
    this.cvv = await bcrypt.hash(this.cvv, 10);
  }

  // Relación OneToOne con la entidad Usuario
  @OneToOne(() => Usuario, (usuario) => usuario.tarjeta)
  @JoinColumn({ name: 'usuario_id' })  // Se especifica el nombre de la clave foránea
  usuario: Usuario;
}
