import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
  ) {}

  create(createTarefaDto: CreateTarefaDto) {
    const task = this.tarefaRepository.create({ ...createTarefaDto });
    return this.tarefaRepository.save(task);
  }

  async findAll(): Promise<Tarefa[]> {
    return this.tarefaRepository.find();
  }

  async findOne(id: number) {
    const task = await this.tarefaRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task not found!`);
    }

    return task;
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto) {
    const task = await this.tarefaRepository.preload({
      id: id,
      ...updateTarefaDto,
    });

    if (!task) {
      throw new NotFoundException(`Task not found!`);
    }

    return this.tarefaRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.tarefaRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task not found!`);
    }

    return this.tarefaRepository.remove(task);
  }
}
