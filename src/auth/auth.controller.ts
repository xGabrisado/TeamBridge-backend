import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    // console.log('req.user');
    // console.log(req.user);

    // @Body() body: any
    // @Req() req: any
    // console.log('req');
    // console.log(req);
    // console.log(body);

    // return { success: true };
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('empresa')
  async createTokenEmpresa(@Req() req: any) {
    const userId = req.user.id;

    return await this.authService.createTokenEmpresa(userId);
  }

  @UseGuards(AuthGuard(['jwt', 'jwtEmpresa']))
  @Post('loginEmpresa')
  async loginEmpresa(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;

    const tokenPayload: any = jwtDecode(body.companyToken);
    const empresaid = tokenPayload.empresa;

    return await this.authService.loginEmpresa(userId, empresaid);
  }
}
