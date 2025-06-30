import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "./user.entity.js";
import { Genre } from "./genre.entity.js";
import { Album } from "./album.entity.js";
import { Audiofile } from "./audiofile.entity.js";
import { ImageFile } from "./image_file.entity.js";

export enum SongType {
  SINGLE = "single",
  EP = "ep",
  ALBUM = "album",
}

registerEnumType(SongType, {
  name: "SongType",
  description: "the type the song belongs to: Single, EP or ALBUM",
});

@ObjectType()
class SongInfo {
  @Field()
  credit: string;
  @Field()
  description: string;
  @Field()
  written_by: string;
  @Field()
  produced_by: string;
  @Field()
  year: string;
}

@ObjectType()
@Entity({
  name: "song",
  orderBy: {
    name: "ASC",
    id: "DESC",
  },
})
export class Song extends BaseEntity {
  // --- Basic Info ---
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  artist!: User;

  @Field(() => Genre, { nullable: false })
  @ManyToOne(() => Genre, { nullable: false, onDelete: "CASCADE" })
  genre!: Genre;

  @Field(() => Album)
  @ManyToOne(() => Album, { onDelete: "CASCADE" })
  album?: Album;

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

  @Field(() => Audiofile)
  @ManyToOne(() => Audiofile, { onDelete: "CASCADE" })
  audiofile!: Audiofile;

  @Field(() => ImageFile)
  @ManyToOne(() => ImageFile, { onDelete: "CASCADE" })
  image!: ImageFile;

  @Field()
  @Column({ type: "int", default: 0, nullable: false })
  num_plays: number;

  @Field()
  @Column({ type: "boolean", default: true })
  is_single: boolean;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: SongType,
    default: SongType.SINGLE,
    nullable: false,
  })
  song_type!: SongType;

  @Field(() => SongInfo)
  @Column({
    type: "jsonb",
    nullable: false,
  })
  song_info: SongInfo;
}
