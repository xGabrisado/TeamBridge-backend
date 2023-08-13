import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { compareSync } from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    console.log('userAuthService');
    console.log(user);
    const payload = { sub: user.id, userEmail: user.userEmail };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userEmail: string, password: string) {
    let user: Usuario;
    try {
      user = await this.usuarioService.findOneOrFail({
        where: { userEmail },
      });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    console.log(password, user.password);

    return user;
  }
}
