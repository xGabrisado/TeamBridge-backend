import { Module, forwardRef } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TarefaModule } from 'src/tarefa/tarefa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comentario]),
    UsuarioModule,
    forwardRef(() => TarefaModule),
  ],
  controllers: [ComentarioController],
  providers: [ComentarioService],
  exports: [ComentarioService],
})
export class ComentarioModule {}
