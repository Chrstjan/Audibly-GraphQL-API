import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.entity.js";
import { Genre } from "./genre.entity.js";
import { Album } from "./album.entity.js";
import { Audiofile } from "./audiofile.entity.js";
import { SongImage } from "./song_image.entity.js";
import { SongContributor } from "./song_contributor.entity.js";

export enum SongType {
  SINGLE = "single",
  EP = "ep",
  ALBUM = "album",
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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.songs, { onDelete: "CASCADE" })
  @Field(() => User)
  artist: Promise<User>;

  @ManyToOne(() => Genre, (genre) => genre.songs, { onDelete: "SET NULL" })
  @Field(() => Genre)
  genre: Promise<Genre>;

  @ManyToOne(() => Album, (album) => album.songs, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @Field(() => Album, { nullable: true })
  album?: Promise<Album>;

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

  @OneToOne(() => Audiofile, (audiofile) => audiofile.song, {
    onDelete: "SET NULL",
  })
  @Field(() => Audiofile)
  audiofile: Promise<Audiofile>;

  @OneToOne(() => SongImage, (image) => image.song, { onDelete: "SET NULL" })
  @Field(() => SongImage)
  image: Promise<SongImage>;

  @Field()
  @Column({ type: "int", default: 0, nullable: false })
  num_plays: number;

  @Field()
  @Column({ type: "boolean", default: false })
  is_single: boolean;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: SongType,
    default: SongType.SINGLE,
    nullable: false,
  })
  song_type: SongType;

  @Field(() => String, { nullable: false })
  @Column({ type: "jsonb", nullable: false })
  song_info: Record<string, string>;

  @OneToMany(() => SongContributor, (contributor) => contributor.song, {
    nullable: true,
  })
  @Field(() => [SongContributor], { nullable: true })
  contributors?: Promise<[SongContributor]>;
}
