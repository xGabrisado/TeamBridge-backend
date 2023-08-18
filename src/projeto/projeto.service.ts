import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private readonly projetoRepository: Repository<Projeto>,
  ) {}

  create(createProjetoDto: CreateProjetoDto) {
    const project = this.projetoRepository.create({ ...createProjetoDto });

    return this.projetoRepository.save(project);
  }

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projetoRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project not found!`);
    }

    return project;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const project = await this.projetoRepository.preload({
      id: id,
      ...updateProjetoDto,
    });

    if (!project) {
      throw new NotFoundException(`Project not found!`);
    }
    return this.projetoRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.projetoRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project not found!`);
    }

    return this.projetoRepository.remove(project);
  }
}
