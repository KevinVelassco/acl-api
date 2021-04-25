import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Role } from './entities/role.entity';

import { RolesService } from './roles.service';

import { CreateRoleInput } from './dto/create-role-input.dto';
import { FindAllRolesInput } from './dto/find-all-roles-input.dto';
import { FindOneRoleInput } from './dto/find-one-role-input.dto';
import { UpdateRoleInput } from './dto/update-role-input.dto';

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

  @Query(() => Role, { name: 'role', nullable: true })
  findOne (@Args('findOneRoleInput') findOneRoleInput: FindOneRoleInput
  ): Promise<Role | null> {
    return this.service.findOne(findOneRoleInput);
  }

  @Mutation(() => Role, { name: 'updateRole' })
  update (
    @Args('findOneRoleInput') findOneRoleInput: FindOneRoleInput,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput
  ): Promise<Role> {
    return this.service.Update(findOneRoleInput, updateRoleInput);
  }

  @Mutation(() => Role, { name: 'removeRole' })
  remove (@Args('findOneRoleInput') findOneRoleInput: FindOneRoleInput
  ): Promise<Role> {
    return this.service.remove(findOneRoleInput);
  }
}
