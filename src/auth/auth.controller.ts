import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) dto: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }
}
