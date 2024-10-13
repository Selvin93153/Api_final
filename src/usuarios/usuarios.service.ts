import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/roles/entities/roles.entity';  
import { Membresia } from 'src/membresias/entities/membresia.entity'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private readonly rolesRepository: Repository<Rol>,
        @InjectRepository(Membresia)
        private readonly membresiasRepository: Repository<Membresia>,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto) {
        const { rol_id, membresia_id, ...resto } = createUsuarioDto;

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);

        // Buscar el rol por ID
        const rol = await this.rolesRepository.findOne({ where: { rol_id } });
        if (!rol) {
            throw new NotFoundException(`Rol con ID ${rol_id} no encontrado`);
        }

        // Buscar la membresía por ID (si se proporciona)
        let membresia: Membresia = null;
        if (membresia_id) {
            membresia = await this.membresiasRepository.findOne({ where: { membresia_id } });
            if (!membresia) {
                throw new NotFoundException(`Membresía con ID ${membresia_id} no encontrada`);
            }
        }

        // Crear el nuevo usuario
        const newUsuario = this.usuarioRepository.create({
            ...resto,
            contraseña: hashedPassword,
            rol, // Asignamos el rol encontrado
            membresia, // Asignamos la membresía si se encuentra
        });

        return this.usuarioRepository.save(newUsuario);
    }

    async findAll() {
        // Cargar relaciones de rol y membresía al consultar todos los usuarios
        return this.usuarioRepository.find({ relations: ['rol', 'membresia'] });
    }

    async findOne(id: number) {
        const usuario = await this.usuarioRepository.findOne({
            where: { usuario_id: id },
            relations: ['rol', 'membresia'],
        });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const { rol_id, membresia_id, ...resto } = updateUsuarioDto;

        const usuario = await this.findOne(id);

        // Actualizar la contraseña si es proporcionada
        if (updateUsuarioDto.contraseña) {
            usuario.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
        }

        // Actualizar el rol si se proporciona
        if (rol_id) {
            const rol = await this.rolesRepository.findOne({ where: { rol_id } });
            if (!rol) {
                throw new NotFoundException(`Rol con ID ${rol_id} no encontrado`);
            }
            usuario.rol = rol;
        }

        // Actualizar la membresía si se proporciona
        if (membresia_id !== undefined) {
            if (membresia_id === null) {
                usuario.membresia = null; // Si se quiere eliminar la membresía
            } else {
                const membresia = await this.membresiasRepository.findOne({ where: { membresia_id } });
                if (!membresia) {
                    throw new NotFoundException(`Membresía con ID ${membresia_id} no encontrada`);
                }
                usuario.membresia = membresia;
            }
        }

        // Actualizar el resto de los campos
        await this.usuarioRepository.merge(usuario, resto);

        return this.usuarioRepository.save(usuario);
    }

    async remove(id: number) {
        const usuario = await this.findOne(id);
        return this.usuarioRepository.remove(usuario);
    }
}
