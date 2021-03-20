import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Parameter } from './entities/parameter.entity';

import { CreateParameterInput } from './dto/create-parameter-input.dto';
import { FindAllParametersInput } from './dto/find-all-parameters-input.dto';
import { FindOneParameterInput } from './dto/find-one-parameter-input.dto';
import { UpdateParameterInput } from './dto/update-parameter-input.dto';
import { GetParameterValueInput } from './dto/get-parameter-value-input.dto';

@Injectable()
export class ParametersService {
  constructor (
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>
  ) {}

  public async create (createParameterInput: CreateParameterInput): Promise<Parameter> {
    const name = createParameterInput.name
      .trim()
      .toUpperCase()
      .split(' ')
      .join('_');

    const existing = await this.getValue({ checkExisting: false, name });

    if (existing) {
      throw new PreconditionFailedException(`parameter with the name ${name} already exists`);
    }

    const created = this.parameterRepository.create({
      name,
      value: createParameterInput.value,
      description: createParameterInput.description
    });

    const saved = await this.parameterRepository.save(created);

    return saved;
  }

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

  async findOne (findOneParameterInput: FindOneParameterInput): Promise<Parameter | null> {
    const { id } = findOneParameterInput;

    const item = await this.parameterRepository.findOne(id);

    return item || null;
  }

  public async update (findOneParameterInput: FindOneParameterInput, updateParameterInput: UpdateParameterInput): Promise<Parameter> {
    const { id } = findOneParameterInput;

    const existing = await this.findOne(findOneParameterInput);

    if (!existing) {
      throw new NotFoundException(`can't get the parameter with id ${id}.`);
    }

    let { name } = updateParameterInput;

    if (name) {
      name = name
        .trim()
        .toUpperCase()
        .split(' ')
        .join('_');

      const existing = await this.getValue({ checkExisting: false, name });

      if (existing) {
        throw new PreconditionFailedException(`parameter with the name ${name} already exists`);
      }
    }

    const preloaded = await this.parameterRepository.preload({
      id: existing.id,
      ...updateParameterInput,
      name
    });

    const saved = await this.parameterRepository.save(preloaded);

    return saved;
  }

  public async remove (findOneParameterInput: FindOneParameterInput): Promise<Parameter> {
    const { id } = findOneParameterInput;

    const existing = await this.findOne(findOneParameterInput);

    if (!existing) {
      throw new NotFoundException(`can't get the parameter with id ${id}.`);
    }

    const clone = { ...existing };

    await this.parameterRepository.remove(existing);

    return clone;
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
