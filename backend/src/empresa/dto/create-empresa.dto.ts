import { IsNumber, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  readonly razaoSocial: string;

  @IsString()
  readonly nomeFantasia: string;

  @IsNumber()
  readonly cpfCnpj: string;
}
