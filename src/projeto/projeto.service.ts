import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UUID } from 'crypto';
import { Console } from 'console';

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
        projectDeadline: true,
        usuario: {
          id: true,
          userName: true,
          userLastName: true,
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
        created_At: true,
        usuario: {
          userName: true,
          userLastName: true,
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

  async remove(id: number) {
    const project = await this.projetoRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project not found!`);
    }

    return this.projetoRepository.remove(project);
  }
}
