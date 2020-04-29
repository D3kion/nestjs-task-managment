import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JWTPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'top_secret',
    });
  }

  async validate({ username }: JWTPayload): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
