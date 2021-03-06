import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';

import { CompaniesService } from '../companies/companies.service';

import { CreateRoleInput } from './dto/create-role-input.dto';
import { FindAllRolesInput } from './dto/find-all-roles-input.dto';
import { FindOneRoleInput } from './dto/find-one-role-input.dto';
import { UpdateRoleInput } from './dto/update-role-input.dto';
import { GetCompanyRoleByCodeInput } from './dto/get-company-role-by-code-input.dto';

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
      throw new PreconditionFailedException(`already exists a role with code ${code} for the company with uuid ${companyUuid}.`);
    }

    existing = await this.roleRepository.findOne({
      where: {
        name,
        company
      }
    });

    if (existing) {
      throw new PreconditionFailedException(`already exists a role with name ${name} for the company with uuid ${companyUuid}.`);
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

  public async Update (findOneRoleInput: FindOneRoleInput, updateRoleInput: UpdateRoleInput): Promise<Role> {
    const { companyUuid, id } = findOneRoleInput;

    const company = await this.companiesService.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const existing = await this.findOne(findOneRoleInput);

    if (!existing) {
      throw new NotFoundException(`can't get the role ${id} for the company with uuid ${companyUuid}.`);
    }

    const { code, name } = updateRoleInput;

    if (code) {
      const existing = await this.roleRepository.findOne({
        where: {
          code,
          company
        }
      });

      if (existing) {
        throw new PreconditionFailedException(`already exists a role with code ${code} for the company with uuid ${companyUuid}.`);
      }
    }

    if (name) {
      const existing = await this.roleRepository.findOne({
        where: {
          name,
          company
        }
      });

      if (existing) {
        throw new PreconditionFailedException(`already exists a role with name ${name} for the company with uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.roleRepository.preload({
      id: existing.id,
      ...updateRoleInput
    });

    const saved = await this.roleRepository.save(preloaded);

    return saved;
  }

  public async remove (findOneRoleInput: FindOneRoleInput): Promise<Role> {
    const { companyUuid, id } = findOneRoleInput;

    const existing = await this.findOne(findOneRoleInput);

    if (!existing) {
      throw new NotFoundException(`can't get the role ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.roleRepository.remove(existing);

    return clone;
  }

  public async getCompanyRoleByCode (getCompanyRoleByCodeInput: GetCompanyRoleByCodeInput): Promise<Role | null> {
    const { companyUuid, code } = getCompanyRoleByCodeInput;

    const role = await this.roleRepository.createQueryBuilder('u')
      .innerJoin('u.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('u.code = :code', { code })
      .getOne();

    return role || null;
  }
}
