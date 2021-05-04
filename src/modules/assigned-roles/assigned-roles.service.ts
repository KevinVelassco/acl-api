import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AssignedRole } from './entities/assigned-role.entity';

import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';

import { CreateAssignedRoleInput } from './dto/create-assigned-role-input.dto';

@Injectable()
export class AssignedRolesService {
  constructor (
    @InjectRepository(AssignedRole)
    private readonly assignedRoleRepository: Repository<AssignedRole>,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService
  ) {}

  public async create (createAssignedRoleInput: CreateAssignedRoleInput): Promise<AssignedRole> {
    const { companyUuid, roleId, userId } = createAssignedRoleInput;

    const role = await this.rolesService.findOne({ companyUuid, id: roleId });

    if (!role) {
      throw new NotFoundException(`can't get the role ${roleId} for the company with uuid ${companyUuid}.`);
    }

    const user = await this.usersService.findOne({ companyUuid, id: userId });

    if (!user) {
      throw new NotFoundException(`can't get the user ${userId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.assignedRoleRepository.create({
      role,
      user
    });

    const saved = await this.assignedRoleRepository.save(created);

    return saved;
  }
}
