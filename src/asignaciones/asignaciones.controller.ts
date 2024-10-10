import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Controller('asignaciones')
export class AsignacionesController {
    constructor(private readonly asignacionesService: AsignacionesService) {}

    @Post()
    create(@Body() createAsignacionDto: CreateAsignacionDto) {
        return this.asignacionesService.create(createAsignacionDto);
    }

    @Get()
    findAll() {
        return this.asignacionesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.asignacionesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAsignacionDto: UpdateAsignacionDto) {
        return this.asignacionesService.update(+id, updateAsignacionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.asignacionesService.remove(+id);
    }
}
