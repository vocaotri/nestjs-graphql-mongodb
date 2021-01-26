import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { Exclude } from 'class-transformer';
// import { HobbyInput } from 'src/hobby/input/hobby';


@InputType()
export class UserInput {
  @Field({ nullable: true })
  readonly id?: string;
  @Field({ nullable: true })
  readonly name?: string;
  @Field(type => String)
  email: string;
  @Field(type => String)
  password: string;
  @Exclude()
  @Field(type => GraphQLUpload, { nullable: true })
  avatar?: FileUpload;
  @Field(() => [String], { nullable: true })
  hobbies?: string[];
}