import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Membresia } from 'src/membresias/entities/membresia.entity';
import { Rol } from 'src/roles/entities/roles.entity'; 


@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario,Rol,Membresia]),
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService],
})
export class UsuariosModule {}
