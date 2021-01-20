import { Hobby } from '../../hobby/models/hobby';
import { ObjectType, Field } from '@nestjs/graphql';


@ObjectType()
export class User {
  @Field({ nullable: true })
  id: string;

  @Field(type => Date, { name: 'registeredAt' })
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => String)
  email: string;

  password: string;

  @Field({ nullable: true })
  access_token?: string;
  @Field(type => String, { nullable: true })
  name?: string;

  @Field(type => [Hobby], { nullable: true })
  hobbies: Hobby[];
}