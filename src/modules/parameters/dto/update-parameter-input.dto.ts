import { InputType, PartialType } from '@nestjs/graphql';
import { CreateParameterInput } from './create-parameter-input.dto';

@InputType()
export class UpdateParameterInput extends PartialType(CreateParameterInput) {}
