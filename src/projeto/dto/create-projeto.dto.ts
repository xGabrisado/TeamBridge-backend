import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateProjetoDto {
  @ApiProperty({ description: 'Nome do projeto' })
  @IsString()
  readonly projectName: string;

  @ApiProperty({ description: 'Descrição do projeto' })
  @IsString()
  readonly projectDescription: string;

  @ApiProperty({ description: 'Quando o projeto se iniciará' })
  @IsDateString()
  readonly projectBeginning: Date;

  @ApiProperty({ description: 'Prazo de entrega do projeto' })
  @IsDateString()
  readonly projectDeadline: Date;
}
