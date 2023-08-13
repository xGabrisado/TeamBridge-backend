import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/Helpers/messages.helper';
import { RegExHelper } from 'src/Helpers/regex.helper';

export class CreateUsuarioDto {
  // @ApiProperty({ description: 'Login do usuário', uniqueItems: true })
  // @IsString()
  // readonly userLogin: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  readonly password: string;

  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: 'Sobrenome do usuário' })
  @IsString()
  readonly userLastName: string;

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
