import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';

export class CreateComentarioDto {
  @ApiProperty({ description: 'Texto do comentário' })
  @IsString()
  readonly commentText: string;

  //   @ApiProperty({ description: 'Tarefa que sera inserido o comentário' })
  //   @IsString()
  //   readonly tarefa: Tarefa;
}
