import { Module, forwardRef } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
// import { companyProviders } from './empresa.providers';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa]),
    forwardRef(() => UsuarioModule),
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService /*, ...companyProviders*/],
  exports: [EmpresaService],
})
export class EmpresaModule {}
