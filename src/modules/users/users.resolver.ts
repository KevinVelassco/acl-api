import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { CreateUserInput } from './dto/create-user-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => User)
export class UsersResolver {
  constructor (
    private readonly service: UsersService
  ) {}

  @Mutation(() => User, { name: 'createUser' })
  create (@Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.service.create(createUserInput);
  }
}
