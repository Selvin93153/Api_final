import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    categoria_id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre_categoria: string;
}
