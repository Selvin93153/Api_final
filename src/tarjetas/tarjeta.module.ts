import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarjeta } from './entities/tarjeta.entity';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Tarjeta])],
    providers: [TarjetaService],
    controllers: [TarjetaController],
    exports: [TarjetaService],
})
export class TarjetaModule {}
