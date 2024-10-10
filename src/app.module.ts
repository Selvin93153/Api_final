import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { MembresiasModule } from './membresias/membresias.module';
import { EntrenadoresModule } from './entrenadores/entrenadores.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';
import { CategoriasModule } from './categorias/categorias.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuariosModule,
    MembresiasModule,
    EntrenadoresModule,
    AsignacionesModule,
    CategoriasModule,
    RolesModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
