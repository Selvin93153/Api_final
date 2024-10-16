import { PartialType } from '@nestjs/mapped-types';
import { CreateControlPesoDto } from './create-control-peso.dto';

export class UpdateControlPesoDto extends PartialType(CreateControlPesoDto) {}
