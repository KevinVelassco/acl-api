import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Role } from './entities/role.entity';

import { RolesService } from './roles.service';

import { CreateRoleInput } from './dto/create-role-input.dto';
import { FindAllRolesInput } from './dto/find-all-roles-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Role)
export class RolesResolver {
  constructor (
    private readonly service: RolesService
  ) {}

  @Mutation(() => Role, { name: 'createRole' })
  create (@Args('createRoleInput') createRoleInput: CreateRoleInput
  ): Promise<Role> {
    return this.service.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll (@Args('findAllRolesInput') findAllRolesInput: FindAllRolesInput
  ): Promise<Role[]> {
    return this.service.findAll(findAllRolesInput);
  }
}
