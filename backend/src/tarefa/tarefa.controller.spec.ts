import { Test, TestingModule } from '@nestjs/testing';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from './tarefa.service';

describe('TarefaController', () => {
  let tarefaController: TarefaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarefaController],
      providers: [TarefaService],
    }).compile();

    tarefaController = module.get<TarefaController>(TarefaController);
  });

  it('should be defined', () => {
    expect(tarefaController).toBeDefined();
  });
});
