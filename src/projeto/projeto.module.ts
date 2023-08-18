import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
// import { DatabaseModule } from 'src/database/database.module';
// import { projectProviders } from './projeto.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto])],
  controllers: [ProjetoController],
  providers: [ProjetoService],
})
export class ProjetoModule {}
