import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { Asignacion } from './entities/asignacion.entity';

@Injectable()
export class AsignacionesService {
    constructor(
        @InjectRepository(Asignacion)
        private readonly asignacionRepository: Repository<Asignacion>,
    ) {}

    async create(createAsignacionDto: CreateAsignacionDto) {
        const newAsignacion = this.asignacionRepository.create(createAsignacionDto);
        return this.asignacionRepository.save(newAsignacion);
    }

    async findAll() {
        return this.asignacionRepository.find();
    }

    async findOne(id: number) {
        const asignacion = await this.asignacionRepository.findOne({ where: { asignacion_id: id } });
        if (!asignacion) {
            throw new NotFoundException(`Asignacion with id ${id} not found`);
        }
        return asignacion;
    }

    async update(id: number, updateAsignacionDto: UpdateAsignacionDto) {
        const asignacion = await this.findOne(id);
        this.asignacionRepository.merge(asignacion, updateAsignacionDto);
        return this.asignacionRepository.save(asignacion);
    }

    async remove(id: number) {
        const asignacion = await this.findOne(id);
        return this.asignacionRepository.remove(asignacion);
    }
}
