import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UUID } from 'crypto';
import { Console } from 'console';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
// import { ForbiddenError } from '@casl/ability';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private readonly projetoRepository: Repository<Projeto>,
    private usuarioService: UsuarioService,
  ) {}

  async create(createProjetoDto: CreateProjetoDto, id: UUID) {
    const project = this.projetoRepository.create({ ...createProjetoDto });
    const savedProject = await this.projetoRepository.save(project);
    const user = await this.usuarioService.findOneEmpresa(id);
    // console.log(user);

    const updatedProject = this.projetoRepository.merge(savedProject, {
      usuario: user.id,
      empresa: user.empresa,
    });

    await this.usuarioService.updateProject(user.id, updatedProject);
    // console.log(updatedTable);

    return await this.projetoRepository.save(updatedProject);
  }

  async findAll(userId: any): Promise<Projeto[]> {
    const user = await this.usuarioService.findOneEmpresa(userId);
    // console.log('user', user);

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
    // console.log('user.empresa:', user.empresa);

    if (user.userpermission === 'g') {
      return this.projetoRepository.find({
        relations: {
          usuario: true,
          empresa: true,
          tarefa: true,
        },
        where: {
          empresa: {
            id: user.empresa,
          },
        },
        select: {
          id: true,
          projectName: true,
          projectDescription: true,
          projectBeginning: true,
          isDone: true,
          projectDeadline: true,
          done_at: true,
          usuario: {
            id: true,
            userName: true,
            userLastName: true,
            userEmail: true,
          },
          tarefa: {
            taskName: true,
          },
          empresa: {
            id: true,
          },
        },
      });
    }

    return this.projetoRepository.find({
      relations: {
        usuario: true,
        empresa: true,
        tarefa: true,
      },
      where: {
        usuario: {
          id: userId,
        },
        empresa: {
          id: user.empresa,
        },
      },
      select: {
        id: true,
        projectName: true,
        projectDescription: true,
        projectBeginning: true,
        isDone: true,
        projectDeadline: true,
        done_at: true,
        usuario: {
          id: true,
          userName: true,
          userLastName: true,
          userEmail: true,
        },
        tarefa: {
          taskName: true,
        },
        empresa: {
          id: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const project = await this.projetoRepository.findOne({
      where: { id },
      relations: { usuario: true, tarefa: true },
      select: {
        id: true,
        projectName: true,
        projectDescription: true,
        projectDeadline: true,
        projectBeginning: true,
        isDone: true,
        created_At: true,
        done_at: true,
        usuario: {
          userName: true,
          userLastName: true,
          id: true,
        },
        tarefa: true,
      },
    });

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

  async projectDone(id: number) {
    const project = await this.projetoRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException("Couldn't found the project");
    }

    // console.log('project before');
    // console.log(project);

    project.isDone = true;
    project.done_at = new Date();
    console.log('new Date()', new Date());

    // console.log('project after');
    // console.log(project);

    return await this.projetoRepository.save(project);
  }

  async updateUsuario(projectId: number, userEmail: string) {
    const user = await this.usuarioService.findOneOrFail({
      where: { userEmail },
    });

    // console.log('user');
    // console.log(user);

    const projectUser = await this.projetoRepository.findOne({
      where: { id: projectId },
      relations: { usuario: true },
      select: {
        projectName: true,
        id: true,
        usuario: {
          id: true,
          userEmail: true,
          userName: true,
          userLastName: true,
        },
      },
    });

    // console.log('projectUser');
    // console.log(projectUser);

    projectUser.usuario.push(user);

    await this.projetoRepository.save(projectUser);

    return projectUser;
  }

  async removeUser(projectId: number, id: string) {
    const user = await this.usuarioService.findOneOrFail({
      where: { id },
    });

    // console.log('user');
    // console.log(user);

    const projectUser = await this.projetoRepository.findOne({
      where: { id: projectId },
      relations: { usuario: true },
      select: {
        projectName: true,
        id: true,
        usuario: {
          id: true,
          userEmail: true,
          userName: true,
          userLastName: true,
        },
      },
    });

    projectUser.usuario = projectUser.usuario.filter((usuario) => {
      return usuario.id !== user.id;
    });

    await this.projetoRepository.save(projectUser);

    return projectUser;
  }

  async remove(id: number) {
    const project = await this.projetoRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project not found!`);
    }

    return this.projetoRepository.softRemove(project);
  }
}
