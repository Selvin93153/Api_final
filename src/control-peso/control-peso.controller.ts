import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ControlPesoService } from './control-peso.service';
import { CreateControlPesoDto } from './dto/create-control-peso.dto';

@Controller('control-peso')
export class ControlPesoController {
  constructor(private readonly controlPesoService: ControlPesoService) {}

  @Post(':usuarioId')
  create(
    @Param('usuarioId') usuarioId: number,
    @Body() createControlPesoDto: CreateControlPesoDto
  ) {
    return this.controlPesoService.create(createControlPesoDto, usuarioId);
  }

  @Get(':usuarioId')
  findByUsuarioId(@Param('usuarioId') usuarioId: number) {
    return this.controlPesoService.findByUsuarioId(usuarioId);
  }

  @Delete(':usuarioId')
delete(@Param('usuarioId') usuarioId: number) {
  return this.controlPesoService.delete(usuarioId);
}

}
