import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class usuarioEmpresaDto {
  @ApiProperty({ description: 'uuid do usuario' })
  @IsUUID()
  readonly userId: string;
}
