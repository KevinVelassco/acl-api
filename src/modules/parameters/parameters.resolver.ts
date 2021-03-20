import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Parameter } from './entities/parameter.entity';

import { ParametersService } from './parameters.service';

import { CreateParameterInput } from './dto/create-parameter-input.dto';
import { FindAllParametersInput } from './dto/find-all-parameters-input.dto';
import { FindOneParameterInput } from './dto/find-one-parameter-input.dto';
import { UpdateParameterInput } from './dto/update-parameter-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Parameter)
export class ParametersResolver {
  constructor (private readonly service: ParametersService) {}

  @Mutation(() => Parameter, { name: 'createParameter' })
  create (@Args('createParameterInput') createParameterInput: CreateParameterInput): Promise<Parameter> {
    return this.service.create(createParameterInput);
  }

  @Query(() => [Parameter], { name: 'parameters' })
  findAll (@Args('findAllParametersInput') findAllParametersInput: FindAllParametersInput): Promise<Parameter[]> {
    return this.service.findAll(findAllParametersInput);
  }

  @Query(() => Parameter, { name: 'parameter', nullable: true })
  findOne (@Args('findOneParameterInput') findOneParameterInput: FindOneParameterInput): Promise<Parameter | null> {
    return this.service.findOne(findOneParameterInput);
  }

  @Mutation(() => Parameter, { name: 'updateParameter' })
  update (
    @Args('findOneParameterInput') findOneParameterInput: FindOneParameterInput,
    @Args('updateParameterInput') updateParameterInput: UpdateParameterInput
  ): Promise<Parameter> {
    return this.service.update(
      findOneParameterInput,
      updateParameterInput
    );
  }

  @Mutation(() => Parameter, { name: 'removeParameter' })
  remove (@Args('findOneParameterInput') findOneParameterInput: FindOneParameterInput): Promise<Parameter> {
    return this.service.remove(findOneParameterInput);
  }
}
