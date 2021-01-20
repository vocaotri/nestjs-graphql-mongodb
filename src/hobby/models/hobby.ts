import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Hobby {
  @Field({nullable:true})
  id?: string;
  @Field(type => String)
  name: string;
}