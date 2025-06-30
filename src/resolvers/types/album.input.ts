import { InputType, Field } from "type-graphql";
import { MaxLength, Length } from "class-validator";
import { AlbumType } from "../../entities/album.entity.js";
import { ImageFileInput } from "./image_file.input.js";

@InputType()
export class CreateAlbum {
  @Field(() => AlbumType, { defaultValue: AlbumType.ALBUM })
  type!: AlbumType;

  @Field()
  @MaxLength(32)
  @Length(4, 32)
  name!: string;

  @Field(() => ImageFileInput)
  image: ImageFileInput;
}
