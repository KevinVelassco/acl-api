import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Parameter } from './entities/parameter.entity';

import { FindAllParametersInput } from './dto/find-all-parameters-input.dto';
import { GetParameterValueInput } from './dto/get-parameter-value-input.dto';

@Injectable()
export class ParametersService {
  constructor (
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>
  ) {}

  public async findAll (findAllParametersInput: FindAllParametersInput): Promise<Parameter[]> {
    const { limit, skip, search } = findAllParametersInput;

    const query = this.parameterRepository.createQueryBuilder('p');

    if (search) {
      query.where('p.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('p.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async getValue (getParameterValueInput: GetParameterValueInput): Promise<string | null> {
    const { name, checkExisting } = getParameterValueInput;

    const parameter = await this.parameterRepository.createQueryBuilder('p')
      .where('p.name = :name', { name })
      .getOne();

    if (checkExisting && !parameter) {
      throw new NotFoundException(`can't get the parameter with name ${name}.`);
    }

    return (parameter
      ? parameter.value
      : null);
  }
}
