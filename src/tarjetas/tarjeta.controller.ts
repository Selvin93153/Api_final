import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Controller('tarjetas')
export class TarjetaController {
    constructor(private readonly tarjetaService: TarjetaService) {}

    @Post()
    create(@Body() createTarjetaDto: CreateTarjetaDto) {
        return this.tarjetaService.create(createTarjetaDto);
    }

    @Get()
    findAll() {
        return this.tarjetaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.tarjetaService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateTarjetaDto: UpdateTarjetaDto) {
        return this.tarjetaService.update(id, updateTarjetaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.tarjetaService.remove(id);
    }
}
