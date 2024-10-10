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

    async create(createEntrenadorDto: CreateEntrenadorDto) {
        const newEntrenador = this.entrenadorRepository.create(createEntrenadorDto);
        return this.entrenadorRepository.save(newEntrenador);
    }

    async findAll() {
        return this.entrenadorRepository.find();
    }

    async findOne(id: number) {
        const entrenador = await this.entrenadorRepository.findOne({ where: { entrenador_id: id } });
        if (!entrenador) {
            throw new NotFoundException(`Entrenador with id ${id} not found`);
        }
        return entrenador;
    }

    async update(id: number, updateEntrenadorDto: UpdateEntrenadorDto) {
        const entrenador = await this.findOne(id);
        this.entrenadorRepository.merge(entrenador, updateEntrenadorDto);
        return this.entrenadorRepository.save(entrenador);
    }

    async remove(id: number) {
        const entrenador = await this.findOne(id);
        return this.entrenadorRepository.remove(entrenador);
    }
}
