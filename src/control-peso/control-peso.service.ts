import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateControlPesoDto } from './dto/create-control-peso.dto';
import { ControlPeso } from './entities/control-peso.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ControlPesoService {
  constructor(
    @InjectRepository(ControlPeso)
    private readonly controlPesoRepository: Repository<ControlPeso>,
    
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createControlPesoDto: CreateControlPesoDto, usuarioId: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario_id: usuarioId } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
    }

    const controlPeso = this.controlPesoRepository.create({
      ...createControlPesoDto,
      usuario,
    });

    await this.controlPesoRepository.save(controlPeso);
    return controlPeso;
  }

  async findByUsuarioId(usuarioId: number): Promise<ControlPeso> {
    const controlPeso = await this.controlPesoRepository.findOne({
      where: { usuario: { usuario_id: usuarioId } },
      relations: ['usuario'],
    });

    if (!controlPeso) {
      throw new NotFoundException(`Control de peso no encontrado para el usuario con id ${usuarioId}`);
    }

    return controlPeso;
  }

  async delete(usuarioId: number): Promise<void> {
    const result = await this.controlPesoRepository.delete({ usuario: { usuario_id: usuarioId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Control de peso no encontrado para el usuario con id ${usuarioId}`);
    }
  }
}
