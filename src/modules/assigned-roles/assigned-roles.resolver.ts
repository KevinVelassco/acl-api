import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AssignedRole } from './entities/assigned-role.entity';

import { AssignedRolesService } from './assigned-roles.service';

import { CreateAssignedRoleInput } from './dto/create-assigned-role-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => AssignedRole)
export class AssignedRolesResolver {
  constructor (
      private readonly service: AssignedRolesService
  ) {}

  @Mutation(() => AssignedRole, { name: 'createAssignedRole' })
  create (@Args('createAssignedRoleInput') createAssignedRoleInput: CreateAssignedRoleInput
  ): Promise<AssignedRole> {
    return this.service.create(createAssignedRoleInput);
  }
}
