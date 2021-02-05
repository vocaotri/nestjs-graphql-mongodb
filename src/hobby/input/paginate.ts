import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginateInput {
  @Field(type => Int, { nullable: true })
  readonly limit?: number;
  @Field(type => Int, { nullable: true })
  readonly page?: number;
}