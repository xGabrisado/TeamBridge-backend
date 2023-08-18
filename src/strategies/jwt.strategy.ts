import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'BdoCyaVD+G4KSw0qAgy710gxirAxMefB8+DyvRMmY/w=',
    });
  }

  validate(payload: any) {
    return { id: payload.sub, email: payload.userEmail };
  }
}
