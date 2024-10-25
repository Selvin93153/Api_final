import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity'; // Importa la entidad Usuario

@Injectable()
export class TarjetaService {
  constructor(
    @InjectRepository(Tarjeta)
    private readonly tarjetaRepository: Repository<Tarjeta>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Inyecta el repositorio de Usuario
  ) {}

  async create(createTarjetaDto: CreateTarjetaDto) {
    const { usuario_id, ...tarjetaData } = createTarjetaDto; // Separa el usuario_id del resto de los datos

    // Buscar el usuario por usuario_id
    const usuario = await this.usuarioRepository.findOne({
      where: { usuario_id: usuario_id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado`);
    }

    // Crear la tarjeta con los datos restantes del DTO
    const tarjeta = this.tarjetaRepository.create(tarjetaData);

    // Asignar el usuario a la tarjeta
    tarjeta.usuario = usuario;

    // Guardar la tarjeta en la base de datos
    return await this.tarjetaRepository.save(tarjeta);
  }

  async findAll() {
    return await this.tarjetaRepository.find({ relations: ['usuario'] });
  }
  
  async findOne(id: number) {
    const tarjeta = await this.tarjetaRepository.findOneBy({ tarjeta_id: id });
    if (!tarjeta) {
      throw new NotFoundException(`Tarjeta con ID ${id} no encontrada`);
    }
    return tarjeta;
  }

  async update(id: number, updateTarjetaDto: UpdateTarjetaDto) {
    const tarjeta = await this.tarjetaRepository.preload({
      tarjeta_id: id,
      ...updateTarjetaDto,
    });
    if (!tarjeta) {
      throw new NotFoundException(`Tarjeta con ID ${id} no encontrada`);
    }
    return await this.tarjetaRepository.save(tarjeta);
  }

  async remove(id: number) {
    const tarjeta = await this.findOne(id);
    await this.tarjetaRepository.remove(tarjeta);
    return `Tarjeta con ID ${id} ha sido eliminada`;
  }
}
