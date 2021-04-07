import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Company } from './entities/company.entity';

import { CompaniesService } from './companies.service';

import { CreateCompanyInput } from './dto/create-company-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Company)
export class CompaniesResolver {
  constructor (
    private readonly service: CompaniesService
  ) {}

  @Mutation(() => Company, { name: 'createCompany' })
  create (@Args('createCompanyInput') createCompanyInput: CreateCompanyInput
  ): Promise<Company> {
    return this.service.create(createCompanyInput);
  }
}
