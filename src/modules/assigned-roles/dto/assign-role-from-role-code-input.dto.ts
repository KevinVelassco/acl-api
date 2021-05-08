import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class AssignRoleFromRoleCodeInput {
  /*
   * Código del rol
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 5)
  @Field(() => String)
  readonly roleCode: string;

  /*
   * User authUid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly authUid: string;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
