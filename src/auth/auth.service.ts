import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(dto: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(dto);
  }

  async signIn(dto: AuthCredentialsDTO) {
    const username = await this.userRepository.validateUserPassword(dto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
