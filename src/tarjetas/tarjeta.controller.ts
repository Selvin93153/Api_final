import { Controller, Post, Get, Param, Patch, Body, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';

@Controller('tarjetas')
export class TarjetaController {
    constructor(private readonly tarjetaService: TarjetaService) {}

    @Post()
    async create(@Body() createTarjetaDto: CreateTarjetaDto) {
        try {
            // Delega la conversión de fecha al servicio
            return await this.tarjetaService.create(createTarjetaDto);
        } catch (error) {
            console.error('Error al crear la tarjeta:', error);
            throw new BadRequestException('No se pudo crear la tarjeta');
        }
    }

    @Get(':usuarioId')
    async findOne(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<Tarjeta> {
        try {
            return await this.tarjetaService.findOneByUsuarioId(usuarioId);
        } catch (error) {
            console.error('Error al buscar tarjeta por usuarioId:', error);
            throw new BadRequestException('No se encontró tarjeta para el usuario especificado');
        }
    }

    @Patch(':usuarioId')
    async update(
        @Param('usuarioId', ParseIntPipe) usuarioId: number, 
        @Body() updateTarjetaDto: UpdateTarjetaDto
    ): Promise<Tarjeta> {
        try {
            return await this.tarjetaService.update(usuarioId, updateTarjetaDto);
        } catch (error) {
            console.error('Error al actualizar la tarjeta:', error);
            throw new BadRequestException('No se pudo actualizar la tarjeta');
        }
    }

    @Delete(':usuarioId')
    async remove(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<void> {
        try {
            return await this.tarjetaService.remove(usuarioId);
        } catch (error) {
            console.error('Error al eliminar la tarjeta:', error);
            throw new BadRequestException('No se pudo eliminar la tarjeta');
        }
    }
}
