import { Test, TestingModule } from '@nestjs/testing';
import { NotificaçcaoService } from './notificaçcao.service';

describe('NotificaçcaoService', () => {
  let service: NotificaçcaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificaçcaoService],
    }).compile();

    service = module.get<NotificaçcaoService>(NotificaçcaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
