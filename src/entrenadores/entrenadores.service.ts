import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { Entrenador } from './entities/entrenador.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EntrenadoresService {
    constructor(
        @InjectRepository(Entrenador)
        private readonly entrenadorRepository: Repository<Entrenador>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async create(createEntrenadorDto: CreateEntrenadorDto) {
        const usuario = await this.usuarioRepository.findOne({
            where: { usuario_id: createEntrenadorDto.usuario_id }, // Cambiado a un objeto con la propiedad 'where'
        });
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const newEntrenador = this.entrenadorRepository.create({
            ...createEntrenadorDto,
            usuario,
        });

        return this.entrenadorRepository.save(newEntrenador);
    }

    async findAll() {
        return this.entrenadorRepository.find({ relations: ['usuario'] });
    }

    async findOne(id: number) {
        const entrenador = await this.entrenadorRepository.findOne({
            where: { entrenador_id: id }, // Cambiado a un objeto con la propiedad 'where'
            relations: ['usuario'],
        });
        if (!entrenador) {
            throw new NotFoundException(`Entrenador con id ${id} no encontrado`);
        }
        return entrenador;
    }

    async update(id: number, updateEntrenadorDto: UpdateEntrenadorDto) {
        const entrenador = await this.findOne(id);
        
        if (updateEntrenadorDto.usuario_id) {
            const usuario = await this.usuarioRepository.findOne({
                where: { usuario_id: updateEntrenadorDto.usuario_id }, // Cambiado a un objeto con la propiedad 'where'
            });
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }
            entrenador.usuario = usuario; // Actualiza la relación con el usuario
        }

        await this.entrenadorRepository.merge(entrenador, updateEntrenadorDto);
        return this.entrenadorRepository.save(entrenador);
    }

    async remove(id: number) {
        const entrenador = await this.findOne(id);
        return this.entrenadorRepository.remove(entrenador);
    }
}
