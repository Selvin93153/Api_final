import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateControlDto } from './dto/create-control.dto'; // Asegúrate de que tienes este DTO
import { UpdateControlDto } from './dto/update-control.dto'; // Asegúrate de que tienes este DTO
import { Control } from './entities/control.entity'; // Asegúrate de que tienes esta entidad
import { Usuario } from 'src/usuarios/entities/usuario.entity'; // Importa la entidad Usuario

@Injectable()
export class ControlService {
  constructor(
    @InjectRepository(Control)
    private readonly controlRepository: Repository<Control>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Inyecta el repositorio de Usuario
  ) {}

  async create(createControlDto: CreateControlDto) {
    const { usuario_id, ...ControlData } = createControlDto; // Separa el usuario_id del resto de los datos

    // Buscar el usuario por usuario_id
    const usuario = await this.usuarioRepository.findOne({
      where: { usuario_id: usuario_id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado`);
    }

    // Crear la tarjeta con los datos restantes del DTO
    const control = this.controlRepository.create(ControlData);

    // Asignar el usuario a la tarjeta
    control.usuario = usuario;

    // Guardar la tarjeta en la base de datos
    return await this.controlRepository.save(control);
  }

  async findAll() {
    return await this.controlRepository.find({ relations: ['usuario'] });
  }
  
  async findOne(id: number) {
    const control = await this.controlRepository.findOneBy({ peso_id: id });
    if (!control) {
      throw new NotFoundException(`control con ID ${id} no encontrada`);
    }
    return control;
  }

  async update(id: number, updateControlDto: UpdateControlDto) {
    const control = await this.controlRepository.preload({
      peso_id: id,
      ...updateControlDto,
    });
    if (!control) {
      throw new NotFoundException(`control con ID ${id} no encontrada`);
    }
    return await this.controlRepository.save(control);
  }

  async remove(id: number) {
    const control= await this.findOne(id);
    await this.controlRepository.remove(control);
    return `Control con ID ${id} ha sido eliminada`;
  }
}
