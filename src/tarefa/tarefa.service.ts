import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { NotificacaoService } from 'src/notificacao/notificacao.service';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
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
      // console.log('user.empresa');
      // console.log(user.empresa);

      const list = await this.tarefaRepository.find({
        relations: {
          usuario: true,
          projeto: true,
        },
        where: {
          usuario: {
            empresa: {
              id: user.empresa,
            },
          },
        },
        select: {
          id: true,
          taskName: true,
          taskPriority: true,
          taskStatus: true,
          taskDeadline: true,
          isDone: true,
          deleted_At: true,
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

      // console.log('list', list);

      const filteredList = list.filter((task) => task.deleted_At === null);

      // console.log('filteredList', filteredList);
      return filteredList;
    }

    const list = await this.tarefaRepository.find({
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
        isDone: true,
        usuario: {
          id: true,
          userName: true,
          userLastName: true,
        },
      },
    });

    const filteredList = list.filter((task) => task.deleted_At !== null);

    // console.log('filteredlist', filteredList);

    return filteredList;
  }

  async findOneOrFail(options: FindOneOptions<Tarefa>) {
    try {
      const response = await this.tarefaRepository.findOneOrFail(options);
      return response;
    } catch (error) {
      throw new NotFoundException(error.messge);
    }
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

  async update(userId: string, id: number, updateTarefaDto: UpdateTarefaDto) {
    const task = await this.tarefaRepository.preload({
      id: id,
      ...updateTarefaDto,
    });
    // console.log('task', task);
    // return 'this';

    if (!task) {
      throw new NotFoundException(`Task not found!`);
    }

    if (updateTarefaDto.taskStatus) {
      const taks2 = await this.tarefaRepository.findOneOrFail({
        where: { id },
        relations: { usuario: true },
      });
      const notificationText = `A tarefa ${id} teve alteração em seu status`;
      // console.log('updateTarefaDto', updateTarefaDto);
      // return 'this';
      const notificação = await this.notificacaoService.create(
        notificationText,
        userId,
        taks2,
      );
    }

    return this.tarefaRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.tarefaRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task not found!`);
    }

    return this.tarefaRepository.softRemove(task);
  }
}
