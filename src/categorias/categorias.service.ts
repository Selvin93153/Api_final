import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) {}

    async create(createCategoriaDto: CreateCategoriaDto) {
        const newCategoria = this.categoriaRepository.create(createCategoriaDto);
        return this.categoriaRepository.save(newCategoria);
    }

    async findAll() {
        return this.categoriaRepository.find();
    }

    async findOne(id: number) {
        const categoria = await this.categoriaRepository.findOne({ where: { categoria_id: id } });
        if (!categoria) {
            throw new NotFoundException(`Categoria with id ${id} not found`);
        }
        return categoria;
    }

    async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
        const categoria = await this.findOne(id);
        this.categoriaRepository.merge(categoria, updateCategoriaDto);
        return this.categoriaRepository.save(categoria);
    }

    async remove(id: number) {
        const categoria = await this.findOne(id);
        return this.categoriaRepository.remove(categoria);
    }
}
