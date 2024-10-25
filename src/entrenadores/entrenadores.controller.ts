import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrenadoresService } from './entrenadores.service';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';

@Controller('entrenadores')
export class EntrenadoresController {
    constructor(private readonly entrenadoresService: EntrenadoresService) {}

    @Post()
    create(@Body() createEntrenadorDto: CreateEntrenadorDto) {
        return this.entrenadoresService.create(createEntrenadorDto);
    }

    @Get()
    findAll() {
        return this.entrenadoresService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.entrenadoresService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEntrenadorDto: UpdateEntrenadorDto) {
        return this.entrenadoresService.update(+id, updateEntrenadorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.entrenadoresService.remove(+id);
    }
}
