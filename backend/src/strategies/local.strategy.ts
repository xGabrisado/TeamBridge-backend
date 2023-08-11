import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesHelper } from 'src/Helpers/messages.helper';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userEmail',
    });
  }

  async validate(userEmail: string, userPassword: string) {
    const user = await this.authService.validateUser(userEmail, userPassword);

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }

    console.log(user);

    return user;
  }
}
