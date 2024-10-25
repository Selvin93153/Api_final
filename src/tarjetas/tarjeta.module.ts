import { Module } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';
import { Tarjeta } from './entities/tarjeta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario} from 'src/usuarios/entities/usuario.entity';

@Module({
    controllers: [TarjetaController],
    providers: [TarjetaService],
    imports: [
        TypeOrmModule.forFeature([Tarjeta, Usuario]),
    ],
})
export class TarjetaModule {}
