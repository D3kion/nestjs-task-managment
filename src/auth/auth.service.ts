import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

=======
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';

>>>>>>> Added User module
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
}
