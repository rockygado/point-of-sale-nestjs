import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() userInfo) {
    return this.authService.login(userInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  protected(@Request() req): string {
    return req.user;
  }
}
