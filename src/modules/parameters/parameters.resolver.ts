import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Parameter } from './entities/parameter.entity';

import { ParametersService } from './parameters.service';

import { FindAllParametersInput } from './dto/find-all-parameters-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Parameter)
export class ParametersResolver {
  constructor (private readonly service: ParametersService) {}

  @Query(() => [Parameter], { name: 'parameters' })
  findAll (@Args('findAllParametersInput') findAllParametersInput: FindAllParametersInput): Promise<Parameter[]> {
    return this.service.findAll(findAllParametersInput);
  }
}
