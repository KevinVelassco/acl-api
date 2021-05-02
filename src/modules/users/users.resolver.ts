import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { CreateUserInput } from './dto/create-user-input.dto';
import { FindAllUsersInput } from './dto/find-all-users-input.dto';
import { FindOneUserInput } from './dto/find-one-user-input.dto';

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

  @Query(() => [User], { name: 'users' })
  findAll (@Args('findAllUsersInput') findAllUsersInput: FindAllUsersInput
  ): Promise<User[]> {
    return this.service.findAll(findAllUsersInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne (@Args('findOneUserInput') findOneUserInput: FindOneUserInput
  ): Promise<User | null> {
    return this.service.findOne(findOneUserInput);
  }

  @Mutation(() => User, { name: 'removeUser' })
  remove (@Args('findOneUserInput') findOneUserInput: FindOneUserInput
  ): Promise<User> {
    return this.service.remove(findOneUserInput);
  }
}
