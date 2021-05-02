import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generateUuid } from '../../utils';

import { User } from './entities/user.entity';

import { CompaniesService } from '../companies/companies.service';

import { CreateUserInput } from './dto/create-user-input.dto';
import { FindAllUsersInput } from './dto/find-all-users-input.dto';
import { FindOneUserInput } from './dto/find-one-user-input.dto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly companiesService: CompaniesService
  ) {}

  public async create (createUserInput: CreateUserInput): Promise<User> {
    const { companyUuid } = createUserInput;

    const company = await this.companiesService.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const created = this.userRepository.create({
      ...createUserInput,
      authUid: generateUuid(21),
      company
    });

    const saved = await this.userRepository.save(created);

    return saved;
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
