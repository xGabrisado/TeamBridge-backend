import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtEmpresa extends PassportStrategy(Strategy, 'jwtEmpresa') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('companyToken'),
      ignoreExpiration: false,
      secretOrKey: 'BdoCyaVD+G4KSw0qAgy710gxirAxMefB8+DyvRMmY/w=',
    });
  }

  validate(payload: any) {
    const empresaid = payload.empresaid;
    console.log('empresaid');
    console.log(empresaid);

    return {
      empresaid: empresaid,
    };
  }
}
