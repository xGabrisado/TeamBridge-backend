import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificacaoDto } from './create-notificacao.dto';
import { IsBoolean } from 'class-validator';

export class UpdateNotificacaoDto {
  @ApiProperty({ description: 'Abrir a notificação' })
  @IsBoolean()
  readonly isOpen: boolean;
}
