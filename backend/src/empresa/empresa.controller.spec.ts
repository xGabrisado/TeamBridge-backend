import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

describe('EmpresaController', () => {
  let empresaController: EmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [EmpresaService],
    }).compile();

    empresaController = module.get<EmpresaController>(EmpresaController);
  });

  it('should be defined', () => {
    expect(empresaController).toBeDefined();
  });
});
