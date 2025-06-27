import { InputType, Field } from "type-graphql";
import { MaxLength, Length } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @MaxLength(22)
  @Length(7, 22)
  username!: string;

  @Field()
  @MaxLength(30)
  @Length(8, 30)
  password!: string;
}

@InputType()
export class SignupInput {
  @Field()
  @MaxLength(22)
  @Length(7, 22)
  email!: string;

  @Field()
  @MaxLength(30)
  @Length(8, 30)
  password!: string;

  @Field()
  @MaxLength(30)
  @Length(4, 30)
  username!: string;
}
