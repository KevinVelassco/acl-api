import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateRoleInput {
  /*
   * Código del rol
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 5)
  @Field(() => String)
  readonly code: string;

  /*
   * Nombre del rol
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Field(() => String)
  readonly name: string;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
