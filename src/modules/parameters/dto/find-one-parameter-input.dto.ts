import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class FindOneParameterInput {
  @IsNumber()
  @Field(() => Int)
  readonly id: number;
}
