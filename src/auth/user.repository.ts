import { Repository, EntityRepository } from 'typeorm';
<<<<<<< HEAD
=======

>>>>>>> Added User module
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
<<<<<<< HEAD
  //
=======
  async signUp() {}
>>>>>>> Added User module
}
