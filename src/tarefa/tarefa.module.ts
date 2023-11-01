import { Module, forwardRef } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
// import { DatabaseModule } from 'src/database/database.module';
// import { taskProviders } from './tarefa.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ComentarioModule } from 'src/comentario/comentario.module';
import { NotificacaoModule } from 'src/notificacao/notificacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarefa]),
    UsuarioModule,
    forwardRef(() => ComentarioModule),
    NotificacaoModule,
  ],
  controllers: [TarefaController],
  providers: [TarefaService],
  exports: [TarefaService],
})
export class TarefaModule {}
