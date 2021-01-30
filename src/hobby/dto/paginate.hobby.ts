import { Hobby } from 'src/hobby/models/hobby';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginateHobby {
  @Field(type => [Hobby])
  hobbies:Hobby[]
  @Field(type=> Int)
  total:number
  @Field(type=> Int)
  limit:number
  @Field(type=> Int)
  page:number
  @Field(type=> Int)
  pages:number
}