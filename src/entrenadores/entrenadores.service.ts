import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { Entrenador } from './entities/entrenador.entity';

@Injectable()
export class EntrenadoresService {
    constructor(
        @InjectRepository(Entrenador)
        private readonly entrenadorRepository: Repository<Entrenador>,
    ) {}

    async create(createEntrenadorDto: CreateEntrenadorDto): Promise<Entrenador> {
        const nuevoEntrenador = this.entrenadorRepository.create(createEntrenadorDto);
        return await this.entrenadorRepository.save(nuevoEntrenador);
    }

    async findAll(): Promise<Entrenador[]> {
        return await this.entrenadorRepository.find({
            relations: ['usuario', 'asignaciones'],
        });
    }

    async findOne(id: number): Promise<Entrenador> {
        const entrenador = await this.entrenadorRepository.findOne({
            where: { entrenador_id: id },
            relations: ['usuario', 'asignaciones'],
        });

        if (!entrenador) {
            throw new NotFoundException(`Entrenador con ID ${id} no encontrado`);
        }

        return entrenador;
    }

    async update(id: number, updateEntrenadorDto: UpdateEntrenadorDto): Promise<Entrenador> {
        const entrenador = await this.entrenadorRepository.preload({
            entrenador_id: id,
            ...updateEntrenadorDto,
        });

        if (!entrenador) {
            throw new NotFoundException(`Entrenador con ID ${id} no encontrado`);
        }

        return await this.entrenadorRepository.save(entrenador);
    }

    async remove(id: number): Promise<void> {
        const result = await this.entrenadorRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Entrenador con ID ${id} no encontrado`);
        }
    }
}
