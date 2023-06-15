import { IsDateString, IsString } from 'class-validator';

export class CreateTarefaDto {
  @IsString()
  readonly taskName: string;

  @IsString()
  readonly taskStatus: string;

  @IsString()
  readonly taskPriority: string;

  @IsDateString()
  readonly taskDeadline: Date;
}
