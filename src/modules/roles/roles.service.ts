import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';

import { CompaniesService } from '../companies/companies.service';

import { CreateRoleInput } from './dto/create-role-input.dto';
import { FindAllRolesInput } from './dto/find-all-roles-input.dto';
import { FindOneRoleInput } from './dto/find-one-role-input.dto';

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

  public async findAll (findAllRolesInput: FindAllRolesInput): Promise<Role[]> {
    const { companyUuid, limit, skip, search } = findAllRolesInput;

    const query = this.roleRepository.createQueryBuilder('r')
      .loadAllRelationIds()
      .innerJoin('r.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('r.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('r.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneRoleInput: FindOneRoleInput): Promise<Role | null> {
    const { companyUuid, id } = findOneRoleInput;

    const item = await this.roleRepository.createQueryBuilder('r')
      .loadAllRelationIds()
      .innerJoin('r.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('r.id = :id', { id })
      .getOne();

    return item || null;
  }
}
