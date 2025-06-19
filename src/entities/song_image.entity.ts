import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.entity.js";
import { Song } from "./song.entity.js";

@ObjectType()
class ImageFileCredit {
  @Field()
  artist_credit: string;

  @Field()
  source: string;
}

@ObjectType()
@Entity({
  name: "song_image",
  orderBy: {
    id: "DESC",
  },
})
export class SongImage extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
  })
  filename: string;

  @ManyToOne(() => User, (user) => user.images, { onDelete: "CASCADE" })
  @Field(() => User)
  user: Promise<User>;

  @Field(() => ImageFileCredit)
  @Column({
    type: "jsonb",
    nullable: false,
  })
  file_credit: ImageFileCredit;

  @OneToOne(() => Song, (song) => song.image)
  @Field(() => Song)
  song: Promise<Song>;
}
