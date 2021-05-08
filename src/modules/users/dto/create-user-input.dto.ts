import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, Length, IsOptional } from 'class-validator';

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
   * Código del rol
   */
  @IsOptional()
  @IsString()
  @Length(3, 5)
  @Field(() => String, { nullable: true })
  readonly roleCode?: string;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
