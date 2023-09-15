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

  async create(createTarefaDto: CreateTarefaDto) {
    const tarefaDto = {
      taskName: createTarefaDto.taskName,
      taskPriority: createTarefaDto.taskPriority,
      taskDeadline: createTarefaDto.taskDeadline,
      projeto: createTarefaDto.projeto,
    };

    const task = await this.tarefaRepository.save({ ...tarefaDto });
    const user = await this.usuarioService.findOneEmpresa(
      createTarefaDto.usuario[0],
    );

    const updatedTask = this.tarefaRepository.merge(task, {
      usuario: user.id,
    });

    await this.usuarioService.updateTask(user.id, updatedTask);

    return await this.tarefaRepository.save(updatedTask);
  }

  async findAll(userId): Promise<Tarefa[]> {
    const user = await this.usuarioService.findOneEmpresa(userId);
    // console.log('user', user);

    // console.log(user);

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

    const userPermission = await user.userpermission;
    // console.log('userPermission', userPermission);

    if (userPermission === 'a') {
      return this.tarefaRepository.find();
    }

    if (userPermission === 'g') {
      return this.tarefaRepository.find({
        relations: {
          usuario: true,
          projeto: true,
        },
        where: {
          usuario: {
            empresa: user.empresa,
          },
        },
        select: {
          id: true,
          taskName: true,
          taskPriority: true,
          taskStatus: true,
          taskDeadline: true,
          isDone: true,
          usuario: {
            id: true,
            userName: true,
            userLastName: true,
          },
          projeto: {
            projectName: true,
          },
        },
      });
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
    const task = await this.tarefaRepository.findOne({
      where: { id },
      relations: { usuario: true, projeto: true },
    });

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
