import { Test, TestingModule } from '@nestjs/testing';
import { NotificaçcaoController } from './notificaçcao.controller';
import { NotificaçcaoService } from './notificaçcao.service';

describe('NotificaçcaoController', () => {
  let controller: NotificaçcaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificaçcaoController],
      providers: [NotificaçcaoService],
    }).compile();

    controller = module.get<NotificaçcaoController>(NotificaçcaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
