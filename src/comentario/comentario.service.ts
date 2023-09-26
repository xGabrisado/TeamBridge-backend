import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TarefaService } from 'src/tarefa/tarefa.service';
import { log } from 'console';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    private usuarioService: UsuarioService,
    private tarefaService: TarefaService,
  ) {}

  async create(
    tarefaId: number,
    createComentarioDto: CreateComentarioDto,
    usuarioId: string,
  ) {
    console.log('tarefaId', tarefaId);
    console.log('createComentarioDto', createComentarioDto);
    console.log('usuarioId', usuarioId);
    const user = await this.usuarioService.findOneOrFail({
      where: { id: usuarioId },
    });

    const tarefa = await this.tarefaService.findOneOrFail({
      where: { id: tarefaId },
    });

    const comentario = this.comentarioRepository.create({
      ...createComentarioDto,
      usuario: user,
      tarefa: tarefa,
    });

    // const comentarioSalvo = await this.comentarioRepository.save(comentario);

    // console.log(comentarioSalvo);

    return await this.comentarioRepository.save(comentario);
  }

  async findAll(tarefaId) {
    const tarefas = await this.comentarioRepository.find({
      relations: { tarefa: true, usuario: true },
      where: { tarefa: tarefaId },
    });

    // log(tarefas);

    return tarefas;
  }

  async findOne(tarefaId: any, commentId: number) {
    const comentario = await this.comentarioRepository.findOne({
      relations: { tarefa: true, usuario: true },
      where: { tarefa: tarefaId, id: commentId },
    });

    return comentario;
  }

  async update(commentId: number, updateComentarioDto: UpdateComentarioDto) {
    const comentario = await this.comentarioRepository.findOneBy({
      id: commentId,
    });

    if (!comentario) {
      throw new NotFoundException(`comentario not found!`);
    }

    this.comentarioRepository.merge(comentario, updateComentarioDto);

    return this.comentarioRepository.save(comentario);
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
