import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "./user.entity.js";
import { ImageFile } from "./image_file.entity.js";

export enum AlbumType {
  ALBUM = "album",
  EP = "ep",
}

registerEnumType(AlbumType, {
  name: "AlbumType",
  description: "the type of album: ALBUM or EP",
});

@ObjectType()
@Entity({
  name: "album",
  orderBy: {
    name: "ASC",
    id: "DESC",
  },
})
export class Album extends BaseEntity {
  // --- Basic Info ---
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  artist!: User;

  @Field(() => String, { nullable: false })
  @Column({
    type: "enum",
    enum: AlbumType,
    nullable: false,
    default: AlbumType.ALBUM,
  })
  type!: AlbumType;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
    unique: true,
  })
  name: string;

  @Field(() => String)
  @Column({
    type: "varchar",
    nullable: false,
    unique: true,
  })
  slug: string;

  @Field(() => ImageFile)
  @ManyToOne(() => ImageFile, { nullable: false, onDelete: "CASCADE" })
  image: ImageFile;
}
