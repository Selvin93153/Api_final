import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../usuarios/entities/usuario.entity'; // Asegúrate de que la ruta sea correcta

@Entity('tarjetas')
export class Tarjeta {
    @PrimaryGeneratedColumn()
    tarjeta_id: number;

    @Column({ unique: true }) // Asegura que el usuario solo tenga una tarjeta
    usuario_id: number;

    @OneToOne(() => Usuario, (usuario) => usuario.tarjeta, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column('text')
    numero_tarjeta: string; // Guardamos como texto para cifrado

    @Column({type:'date'})
    fecha_expiracion: Date;

    @Column('text')
    nombre_titular: string;

    @Column('text')
    cvv: string; // Guardamos como texto para cifrado

    @BeforeInsert()
    async encryptSensitiveData() {
        // Convertimos a texto para cifrado
        this.numero_tarjeta = await bcrypt.hash(this.numero_tarjeta.toString(), 10);
        this.cvv = await bcrypt.hash(this.cvv.toString(), 10);
    }
}
