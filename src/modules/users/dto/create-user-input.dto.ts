import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

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
   * Es usuario administrador
   */
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly isAdmin?: boolean;

  /*
   * Company uuid
   */
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
