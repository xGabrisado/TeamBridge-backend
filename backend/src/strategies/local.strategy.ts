import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesHelper } from 'src/Helpers/messages.helper';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userEmail',
    });
  }

  async validate(userEmail: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userEmail, password);

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }

    return user;
  }
}
