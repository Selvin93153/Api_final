import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMembresiaDto } from './dto/create-membresia.dto';
import { UpdateMembresiaDto } from './dto/update-membresia.dto';
import { Membresia } from './entities/membresia.entity';

@Injectable()
export class MembresiasService {
    constructor(
        @InjectRepository(Membresia)
        private readonly membresiaRepository: Repository<Membresia>,
    ) {}

    async create(createMembresiaDto: CreateMembresiaDto) {
        const newMembresia = this.membresiaRepository.create(createMembresiaDto);
        return this.membresiaRepository.save(newMembresia);
    }

    async findAll() {
        return this.membresiaRepository.find();
    }

    async findOne(id: number) {
        const membresia = await this.membresiaRepository.findOne({ where: { membresia_id: id } });
        if (!membresia) {
            throw new NotFoundException(`Membresía with id ${id} not found`);
        }
        return membresia;
    }

    async update(id: number, updateMembresiaDto: UpdateMembresiaDto) {
        const membresia = await this.findOne(id);
        this.membresiaRepository.merge(membresia, updateMembresiaDto);
        return this.membresiaRepository.save(membresia);
    }

    async remove(id: number) {
        const membresia = await this.findOne(id);
        return this.membresiaRepository.remove(membresia);
    }
}
