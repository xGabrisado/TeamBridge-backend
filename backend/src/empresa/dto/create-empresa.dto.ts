import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({ description: 'Razão Social da empresa', uniqueItems: true })
  @IsString()
  readonly razaoSocial: string;

  @ApiProperty({ description: 'Nome fantasia da empresa' })
  @IsString()
  readonly nomeFantasia: string;

  @ApiProperty({ description: 'CPF ou CNPJ da empresa', uniqueItems: true })
  @IsString()
  readonly cpfCnpj: string;
}
