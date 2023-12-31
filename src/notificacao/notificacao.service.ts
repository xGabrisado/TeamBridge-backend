import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacaoService {
  constructor(
    @InjectRepository(Notificacao)
    private readonly notificacaoRepository: Repository<Notificacao>,
  ) {}

  async create(notificationText: string, userId: string, tarefa: Tarefa) {
    // console.log('user', userId);

    // console.log('tarefa', tarefa);

    if (userId === tarefa.usuario[0].id) {
      return 'the same user as the task';
    }

    const notificacao = this.notificacaoRepository.create({
      notification_text: notificationText,
      tarefaId: tarefa.id,
      usuarioId: tarefa.usuario[0].id,
    });

    // console.log('notificacao: ', notificacao);

    // console.log(
    //   'notificação salva: ',
    //   await this.noti  ficacaoRepository.save(notificacao),
    // );

    return await this.notificacaoRepository.save(notificacao);
  }

  async findAll(id) {
    const notificacoes = await this.notificacaoRepository.find({
      where: { usuarioId: id },
    });

    return notificacoes;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacao`;
  }

  async update(id: number, updateNotificacaoDto: UpdateNotificacaoDto) {
    // console.log(id, UpdateNotificacaoDto);
    const notification = await this.notificacaoRepository.findOneOrFail({
      where: { id },
    });

    this.notificacaoRepository.merge(notification, updateNotificacaoDto);

    return this.notificacaoRepository.save(notification);
  }

  remove(id: number) {
    return `This action removes a #${id} notificacao`;
  }
}
