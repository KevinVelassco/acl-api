import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindAllRolesInput {
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  readonly skip?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly search?: string;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
