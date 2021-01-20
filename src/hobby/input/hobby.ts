import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class HobbyInput {
  @Field({ nullable: true })
  readonly id?: string;
  @Field({ nullable: true })
  readonly name?: string;
}