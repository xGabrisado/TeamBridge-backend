import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { comparSync } from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    console.log('userAuthService');
    console.log(user);
    const payload = { sub: user.id, userEmail: user.userEmail };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userEmail: string, userPassword: string) {
    console.log(userEmail);
    console.log(userPassword);

    let user: Usuario;
    try {
      user = await this.usuarioService.findOneOrFail({
        where: { userEmail },
      });
    } catch (error) {
      return null;
    }

    const isPasswordValid = comparSync(userPassword, user.userPassword);
    if (!isPasswordValid) return null;

    return user;
  }
}
