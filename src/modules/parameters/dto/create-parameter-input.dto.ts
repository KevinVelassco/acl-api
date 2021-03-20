import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateParameterInput {
  /*
   * Nombre del parametro
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Field(() => String)
  readonly name: string;

  /*
   * Valor del parametro
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @Field(() => String)
  readonly value: string;

  /*
   * descripcion del parametro
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @Field(() => String)
  readonly description: string;
}
