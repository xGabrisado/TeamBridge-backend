import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreateTarefaDto {
  @ApiProperty({ description: 'Nome da tarefa' })
  @IsString()
  readonly taskName: string;

  @ApiProperty({ description: 'Prioridade para fazer a tarefa' })
  @IsString()
  readonly taskPriority: string;

  @ApiProperty({ description: 'Prazo de entrega da  tarefa' })
  @IsDateString()
  readonly taskDeadline: Date;

  @ApiProperty({ description: 'Id do usuario que cuidará da tarefa' })
  @IsArray()
  readonly usuario?: Usuario[];

  @ApiProperty({ description: 'Projeto que a tarefa pertence' })
  @IsNumber()
  readonly projeto: Projeto;
}
