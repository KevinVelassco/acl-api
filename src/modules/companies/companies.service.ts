import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { generateUuid } from '../../utils';

import { Company } from './entities/company.entity';

import { CreateCompanyInput } from './dto/create-company-input.dto';

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
}
