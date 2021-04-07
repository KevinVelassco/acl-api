import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  /*
   * Nombre del company
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Field(() => String)
  readonly name: string;
}
