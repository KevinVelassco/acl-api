import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { generateUuid } from '../../utils';

import { Company } from './entities/company.entity';

import { CreateCompanyInput } from './dto/create-company-input.dto';
import { FindAllCompaniesInput } from './dto/find-all-companies-input.dto';
import { FindOneCompanyInput } from './dto/find-one-company-input.dto';
import { UpdateCompanyInput } from './dto/update-company-input.dto';

@Injectable()
export class CompaniesService {
  constructor (
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  public async create (createCompanyInput: CreateCompanyInput): Promise<Company> {
    const created = this.companyRepository.create({
      ...createCompanyInput,
      uuid: generateUuid(21)
    });

    const saved = await this.companyRepository.save(created);

    return saved;
  }

  public async findAll (findAllCompaniesInput: FindAllCompaniesInput): Promise<Company[]> {
    const { limit, skip, search } = findAllCompaniesInput;

    const query = this.companyRepository.createQueryBuilder('c');

    if (search) {
      query.where('c.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('c.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneCompanyInput: FindOneCompanyInput): Promise<Company | null> {
    const { companyUuid } = findOneCompanyInput;

    const item = await this.companyRepository.createQueryBuilder('c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .getOne();

    return item || null;
  }

  public async update (findOneCompanyInput: FindOneCompanyInput, updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    const { companyUuid } = findOneCompanyInput;

    const existing = await this.findOne({ companyUuid });

    if (!existing) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const preloaded = await this.companyRepository.preload({
      id: existing.id,
      ...updateCompanyInput
    });

    const save = await this.companyRepository.save(preloaded);

    return save;
  }
}
