import { PartialType } from '@nestjs/mapped-types';
import { CreateTarjetaDto } from 'src/tarjetas/dto/create-tarjeta.dto';

export class UpdateTarjetaDto extends PartialType(CreateTarjetaDto) {}
