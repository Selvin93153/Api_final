import { Module } from '@nestjs/common';
import { EntrenadoresService } from './entrenadores.service';
import { EntrenadoresController } from './entrenadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenador } from './entities/entrenador.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Entrenador, Usuario]),
    ],
    controllers: [EntrenadoresController],
    providers: [EntrenadoresService],
})
export class EntrenadoresModule {}
