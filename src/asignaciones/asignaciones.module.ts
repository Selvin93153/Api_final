import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';
import { Asignacion } from './entities/asignacion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entrenador } from 'src/entrenadores/entities/entrenador.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Asignacion, Usuario, Entrenador]),
],
    controllers: [AsignacionesController],
    providers: [AsignacionesService],
})
export class AsignacionesModule {}
