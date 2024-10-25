import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-roles.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/roles.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
    ) {}

    async create(createRolDto: CreateRolDto) {
        const newRol = this.rolRepository.create(createRolDto);
        return this.rolRepository.save(newRol);
    }

    async findAll() {
        return this.rolRepository.find();
    }

    async findOne(id: number) {
        const rol = await this.rolRepository.findOne({ where: { rol_id: id } });
        if (!rol) {
            throw new NotFoundException(`Rol with id ${id} not found`);
        }
        return rol;
    }

    async update(id: number, updateRolDto: UpdateRolDto) {
        const rol = await this.findOne(id);
        this.rolRepository.merge(rol, updateRolDto);
        return this.rolRepository.save(rol);
    }

    async remove(id: number) {
        const rol = await this.findOne(id);
        return this.rolRepository.remove(rol);
    }
}
