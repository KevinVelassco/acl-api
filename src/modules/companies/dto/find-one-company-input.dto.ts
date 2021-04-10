import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FindOneCompanyInput {
    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    readonly companyUuid: string;
}
