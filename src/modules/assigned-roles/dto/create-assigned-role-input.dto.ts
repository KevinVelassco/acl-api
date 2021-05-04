import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAssignedRoleInput {
  /*
   * Id del rol
   */
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  readonly roleId: number;

  /*
   * Id del usuario
   */
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  readonly userId: number;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
