import { Module, forwardRef } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
// import { DatabaseModule } from 'src/database/database.module';
// import { taskProviders } from './tarefa.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ComentarioModule } from 'src/comentario/comentario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarefa]),
    UsuarioModule,
    forwardRef(() => ComentarioModule),
  ],
  controllers: [TarefaController],
  providers: [TarefaService],
  exports: [TarefaService],
})
export class TarefaModule {}
