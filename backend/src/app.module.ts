import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProjetoModule } from './projeto/projeto.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { Projeto } from './projeto/entities/projeto.entity';
import { Empresa } from './empresa/entities/empresa.entity';

@Module({
  imports: [
    UsuarioModule,
    EmpresaModule,
    ProjetoModule,
    TarefaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'teambridge',
      entities: [Usuario, Tarefa, Projeto, Empresa],
      // autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
