import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificaçcaoService } from './notificaçcao.service';
import { CreateNotificaçcaoDto } from './dto/create-notificaçcao.dto';
import { UpdateNotificaçcaoDto } from './dto/update-notificaçcao.dto';

@Controller('notificaçcao')
export class NotificaçcaoController {
  constructor(private readonly notificaçcaoService: NotificaçcaoService) {}

  @Post()
  create(@Body() createNotificaçcaoDto: CreateNotificaçcaoDto) {
    return this.notificaçcaoService.create(createNotificaçcaoDto);
  }

  @Get()
  findAll() {
    return this.notificaçcaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificaçcaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificaçcaoDto: UpdateNotificaçcaoDto) {
    return this.notificaçcaoService.update(+id, updateNotificaçcaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificaçcaoService.remove(+id);
  }
}
