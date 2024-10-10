import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRolDto {
    @IsString()
    @IsNotEmpty()
    nombre_rol: string;
}
