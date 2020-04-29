import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { JWTPayload } from './jwt-payload.interface';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(dto);
  }

  async signIn(dto: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(dto);
    if (!username) throw new UnauthorizedException('Invalid credentials');

    const payload: JWTPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
