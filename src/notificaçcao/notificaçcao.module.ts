import { Module } from '@nestjs/common';
import { NotificaçcaoService } from './notificaçcao.service';
import { NotificaçcaoController } from './notificaçcao.controller';

@Module({
  controllers: [NotificaçcaoController],
  providers: [NotificaçcaoService]
})
export class NotificaçcaoModule {}
