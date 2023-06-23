import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

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
}
