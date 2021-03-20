import { Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GetParameterValueInput {
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true, defaultValue: true })
  readonly checkExisting?: boolean;
}
