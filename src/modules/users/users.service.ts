import { forwardRef, Inject, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { generateUuid } from '../../utils';

import { User } from './entities/user.entity';

import { CompaniesService } from '../companies/companies.service';
import { AssignedRolesService } from '../assigned-roles/assigned-roles.service';

import { CreateUserInput } from './dto/create-user-input.dto';
import { FindAllUsersInput } from './dto/find-all-users-input.dto';
import { FindOneUserInput } from './dto/find-one-user-input.dto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private connection: Connection,
    private readonly companiesService: CompaniesService,
    @Inject(forwardRef(() => AssignedRolesService))
    private readonly assignedRolesService: AssignedRolesService
  ) {}

  public async create (createUserInput: CreateUserInput): Promise<User> {
    const { companyUuid } = createUserInput;

    const company = await this.companiesService.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const authUid = generateUuid(21);

    const created = this.userRepository.create({
      ...createUserInput,
      isAdmin: false,
      authUid,
      company
    });

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saved = await queryRunner.manager.save(created);

      const { roleCode } = createUserInput;

      if (roleCode) {
        await this.assignedRolesService.assignRoleFromRoleCode({
          companyUuid,
          roleCode,
          authUid
        }, queryRunner);
      }

      await queryRunner.commitTransaction();

      return saved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }

  public async findAll (findAllUsersInput: FindAllUsersInput): Promise<User[]> {
    const { companyUuid, limit, skip, search } = findAllUsersInput;

    const query = this.userRepository.createQueryBuilder('u')
      .loadAllRelationIds()
      .innerJoin('u.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('u.email ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('u.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneUserInput: FindOneUserInput): Promise<User | null> {
    const { companyUuid, id } = findOneUserInput;

    const item = await this.userRepository.createQueryBuilder('u')
      .loadAllRelationIds()
      .innerJoin('u.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('u.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async remove (findOneUserInput: FindOneUserInput): Promise<User> {
    const { companyUuid, id } = findOneUserInput;

    const existing = await this.findOne(findOneUserInput);

    if (!existing) {
      throw new PreconditionFailedException(`can't get the user ${id} for the company with uuid ${companyUuid}.`);
    }

    const { isAdmin } = existing;

    if (isAdmin) {
      throw new PreconditionFailedException('can\'t remove an admin user.');
    }

    const clone = { ...existing };

    await this.userRepository.remove(existing);

    return clone;
  }
}
