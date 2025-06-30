import { InputType, Field, ID } from "type-graphql";

@InputType()
export class ImageFileInput {
  @Field(() => ID)
  id: number;
}
