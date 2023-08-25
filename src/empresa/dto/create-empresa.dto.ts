import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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

  // @ApiProperty({ description: 'CPF ou CNPJ da empresa', uniqueItems: true })
  // @IsObject()
  // readonly usuario: Usuario[];
}
