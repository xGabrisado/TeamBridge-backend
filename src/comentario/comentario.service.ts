import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TarefaService } from 'src/tarefa/tarefa.service';

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

  findAll() {
    return `This action returns all comentario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
