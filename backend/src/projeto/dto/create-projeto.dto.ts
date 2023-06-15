import { IsDateString, IsString } from 'class-validator';

export class CreateProjetoDto {
  @IsString()
  readonly projectName: string;

  @IsString()
  readonly projecComment: string;

  @IsDateString()
  readonly projectDeadline: Date;
}
