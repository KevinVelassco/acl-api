import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';

import { CompaniesService } from '../companies/companies.service';

import { CreateRoleInput } from './dto/create-role-input.dto';

@Injectable()
export class RolesService {
  constructor (
  @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly companiesService: CompaniesService
  ) {}

  public async create (createRoleInput: CreateRoleInput): Promise<Role> {
    const { companyUuid, code, name } = createRoleInput;

    const company = await this.companiesService.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    let existing = await this.roleRepository.findOne({
      where: {
        code,
        company
      }
    });

    if (existing) {
      throw new PreconditionFailedException(`already exists a role for the company ${companyUuid} and code ${code}.`);
    }

    existing = await this.roleRepository.findOne({
      where: {
        name,
        company
      }
    });

    if (existing) {
      throw new PreconditionFailedException(`already exists a role for the company ${companyUuid} and name ${name}.`);
    }

    const created = this.roleRepository.create({
      ...createRoleInput,
      company
    });

    const saved = await this.roleRepository.save(created);

    return saved;
  }
}
