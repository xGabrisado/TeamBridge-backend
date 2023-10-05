import { Injectable } from '@nestjs/common';
import { CreateNotificaçcaoDto } from './dto/create-notificaçcao.dto';
import { UpdateNotificaçcaoDto } from './dto/update-notificaçcao.dto';

@Injectable()
export class NotificaçcaoService {
  create(createNotificaçcaoDto: CreateNotificaçcaoDto) {
    return 'This action adds a new notificaçcao';
  }

  findAll() {
    return `This action returns all notificaçcao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificaçcao`;
  }

  update(id: number, updateNotificaçcaoDto: UpdateNotificaçcaoDto) {
    return `This action updates a #${id} notificaçcao`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificaçcao`;
  }
}
