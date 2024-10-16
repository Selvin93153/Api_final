import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tarjeta } from './entities/tarjeta.entity';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Injectable()
export class TarjetaService {
    constructor(
        @InjectRepository(Tarjeta)
        private readonly tarjetaRepository: Repository<Tarjeta>,
    ) {}

    async create(createTarjetaDto: CreateTarjetaDto): Promise<Tarjeta> {
        const tarjeta = new Tarjeta();

        tarjeta.usuario_id = createTarjetaDto.usuario_id;
        tarjeta.nombre_titular = createTarjetaDto.nombre_titular;
        tarjeta.numero_tarjeta = await bcrypt.hash(createTarjetaDto.numero_tarjeta.toString(), 10);
        tarjeta.fecha_expiracion = createTarjetaDto.fecha_expiracion;
        tarjeta.cvv = await bcrypt.hash(createTarjetaDto.cvv.toString(), 10);

        return await this.tarjetaRepository.save(tarjeta);
    }

    async findOneByUsuarioId(usuarioId: number): Promise<Tarjeta> {
        return await this.tarjetaRepository.findOne({
            where: { usuario_id: usuarioId },
        });
    }

    async update(usuarioId: number, updateTarjetaDto: UpdateTarjetaDto): Promise<Tarjeta> {
        await this.tarjetaRepository.update({ usuario_id: usuarioId }, updateTarjetaDto);
        return await this.findOneByUsuarioId(usuarioId);
    }

    async remove(usuarioId: number): Promise<void> {
        await this.tarjetaRepository.delete({ usuario_id: usuarioId });
    }
}
