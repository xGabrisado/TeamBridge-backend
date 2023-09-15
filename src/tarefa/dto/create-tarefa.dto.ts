import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreateTarefaDto {
  @ApiProperty({ description: 'Nome da tarefa' })
  @IsString()
  readonly taskName: string;

  @ApiProperty({ description: 'Prioridade para fazer a tarefa' })
  @IsString()
  readonly taskPriority: string;

  @ApiProperty({ description: 'Status de andamento para fazer a tarefa' })
  @IsOptional()
  @IsString()
  readonly taskStatus?: string;

  @ApiProperty({ description: 'Status de andamento para fazer a tarefa' })
  @IsOptional()
  @IsBoolean()
  readonly isDone?: boolean;

  @ApiProperty({ description: 'Prazo de entrega da  tarefa' })
  @IsDateString()
  readonly taskDeadline: Date;

  @ApiProperty({ description: 'Id do usuario que cuidará da tarefa' })
  @IsOptional()
  @IsArray()
  readonly usuario?: Usuario[];

  @ApiProperty({ description: 'Projeto que a tarefa pertence' })
  @IsNumber()
  readonly projeto: Projeto;
}
