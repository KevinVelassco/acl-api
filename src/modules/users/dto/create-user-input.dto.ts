import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  /*
   * Email del usuario
   */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
