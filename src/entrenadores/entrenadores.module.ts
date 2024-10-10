import { Module } from '@nestjs/common';
import { EntrenadoresService } from './entrenadores.service';
import { EntrenadoresController } from './entrenadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenador } from './entities/entrenador.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Entrenador]),
    ],
    controllers: [EntrenadoresController],
    providers: [EntrenadoresService],
})
export class EntrenadoresModule {}
