import { Module, forwardRef } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
// import { DatabaseModule } from 'src/database/database.module';
// import { userProviders } from './usuario.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';
// import { Empresa } from 'src/empresa/entities/empresa.entity';
import { EmpresaModule } from 'src/empresa/empresa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => EmpresaModule),
    CaslModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
