import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlPesoService } from './control-peso.service';
import { ControlPesoController } from './control-peso.controller';
import { ControlPeso } from './entities/control-peso.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlPeso, Usuario])],
  controllers: [ControlPesoController],
  providers: [ControlPesoService],
})
export class ControlPesoModule {}
