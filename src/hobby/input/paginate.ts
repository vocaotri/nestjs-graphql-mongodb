import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PaginateInput {
  @Field({ nullable: true })
  readonly limit?: number;
  @Field({ nullable: true })
  readonly page?: number;
}