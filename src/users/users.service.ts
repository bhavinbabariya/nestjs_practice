import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(email: string, password: string, role: string) {
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }

  findOneByEmail(email: string) {
    if (!email) return null;

    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  findOneById(id: number) {
    if (!id) return null;

    return this.userRepository.findOneBy({ id });
  }

  findAll(role: string) {
    const options: FindManyOptions<User> = {
      select: ['id', 'email'],
      where: {
        role,
      },
    };

    if (role === 'seller') options.relations = ['products'];

    return this.userRepository.find(options);
  }
}
