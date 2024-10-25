import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Control } from './entities/control.entity';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Control, Usuario])],
    controllers: [ControlController],
    providers: [ControlService],
})
export class ControlModule {}
