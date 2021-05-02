import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class FindOneUserInput {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    readonly companyUuid: string;
}
