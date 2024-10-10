import { Module } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Asignacion]),
    ],
    controllers: [AsignacionesController],
    providers: [AsignacionesService],
})
export class AsignacionesModule {}
