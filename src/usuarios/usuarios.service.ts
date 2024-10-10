import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto) {
        const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
        const newUsuario = this.usuarioRepository.create({
            ...createUsuarioDto,
            contraseña: hashedPassword,
        });
        return this.usuarioRepository.save(newUsuario);
    }

    async findAll() {
        return this.usuarioRepository.find();
    }

    async findOne(id: number) {
        const usuario = await this.usuarioRepository.findOne({ where: { usuario_id: id } });
        if (!usuario) {
            throw new NotFoundException(`Usuario with id ${id} not found`);
        }
        return usuario;
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const usuario = await this.findOne(id);
        if (updateUsuarioDto.contraseña) {
            updateUsuarioDto.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
        }
        await this.usuarioRepository.merge(usuario, updateUsuarioDto);
        return this.usuarioRepository.save(usuario);
    }

    async remove(id: number) {
        const usuario = await this.findOne(id);
        return this.usuarioRepository.remove(usuario);
    }
}
