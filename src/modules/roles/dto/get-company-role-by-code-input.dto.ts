import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class GetCompanyRoleByCodeInput {
  /*
  * Código del rol
  */
  @IsNotEmpty()
  @IsString()
  @Length(3, 5)
  @Field(() => String)
  readonly code: string;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
