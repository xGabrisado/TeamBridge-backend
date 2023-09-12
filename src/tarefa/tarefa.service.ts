import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
    private usuarioService: UsuarioService,
  ) {}

  create(createTarefaDto: CreateTarefaDto) {
    const task = this.tarefaRepository.create({ ...createTarefaDto });
    return this.tarefaRepository.save(task);
  }

  async findAll(userId): Promise<Tarefa[]> {
    const user = await this.usuarioService.findOneEmpresa(userId);

    const haveCompany = await user.empresa;

    if (!haveCompany) {
      throw new HttpException(
        'Você não possui empresa',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
      // BadRequestException('Você não possui empresa', {
      //   cause: new Error(),
      //   description: 'Some error description',
      // });
    }

    return this.tarefaRepository.find({
      relations: {
        usuario: true,
        projeto: true,
      },
      where: {
        usuario: {
          id: userId,
        },
      },
      select: {
        id: true,
        taskName: true,
        taskPriority: true,
        taskStatus: true,
        taskDeadline: true,
        usuario: {
          id: true,
          userName: true,
          userLastName: true,
        },
      },
    });
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
