import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Login do usuário', uniqueItems: true })
  @IsString()
  readonly userLogin: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  readonly userPassword: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: 'Email do usuário', uniqueItems: true })
  @IsEmail()
  readonly userEmail: string;

  @ApiProperty({
    description: 'Posto de trabalho do usuário',
    example: 'Programador, gerente, designer, ele escreve aqui.',
  })
  @IsString()
  readonly userPost: string;
}
