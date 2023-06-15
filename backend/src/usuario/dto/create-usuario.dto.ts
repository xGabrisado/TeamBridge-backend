import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  readonly userLogin: string;

  @IsString()
  readonly userPassword: string;

  @IsString()
  readonly userName: string;

  @IsEmail()
  readonly userEmail: string;
}
