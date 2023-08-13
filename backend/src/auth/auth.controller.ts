import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    console.log(req.user);

    // @Body() body: any
    // @Req() req: any
    // console.log('req');
    // console.log(req);
    console.log('controller log');
    // console.log(body);

    // return { success: true };
    return await this.authService.login(req.user);
  }
}
