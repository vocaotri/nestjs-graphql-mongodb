import { InputType, Field } from '@nestjs/graphql';
import { HobbyInput } from 'src/hobby/input/hobby';


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
  @Field(()=>[String], { nullable: true })
  hobbies?: string[];
}