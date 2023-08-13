import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      privateKey: 'BdoCyaVD+G4KSw0qAgy710gxirAxMefB8+DyvRMmY/w=', // process.env.JWT_SECRET_KEY
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
