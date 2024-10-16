import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { Asignacion } from './entities/asignacion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entrenador } from 'src/entrenadores/entities/entrenador.entity';

@Injectable()
export class AsignacionesService {
    constructor(
        @InjectRepository(Asignacion)
        private readonly asignacionRepository: Repository<Asignacion>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Entrenador)
        private readonly entrenadorRepository: Repository<Entrenador>,
    ) {}

    async create(createAsignacionDto: CreateAsignacionDto): Promise<Asignacion> {
        const { usuario_id, entrenador_id, fecha_asignacion } = createAsignacionDto;

        const usuario = await this.usuarioRepository.findOne({ where: { usuario_id } });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado`);
        }

        const entrenador = await this.entrenadorRepository.findOne({ where: { entrenador_id } });
        if (!entrenador) {
            throw new NotFoundException(`Entrenador con ID ${entrenador_id} no encontrado`);
        }

        const nuevaAsignacion = this.asignacionRepository.create({
            usuario,
            entrenador,
            fecha_asignacion,
        });

        return await this.asignacionRepository.save(nuevaAsignacion);
    }

    async findAll(): Promise<Asignacion[]> {
        return await this.asignacionRepository.find({ relations: ['usuario', 'entrenador'] });
    }

    async findOne(id: number): Promise<Asignacion> {
        const asignacion = await this.asignacionRepository.findOne({
            where: { asignacion_id: id },
            relations: ['usuario', 'entrenador'],
        });

        if (!asignacion) {
            throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
        }

        return asignacion;
    }

    async update(id: number, updateAsignacionDto: UpdateAsignacionDto): Promise<Asignacion> {
        const asignacion = await this.asignacionRepository.preload({
            asignacion_id: id,
            ...updateAsignacionDto,
        });

        if (!asignacion) {
            throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
        }

        return await this.asignacionRepository.save(asignacion);
    }

    async remove(id: number): Promise<void> {
        const result = await this.asignacionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
        }
    }
}
