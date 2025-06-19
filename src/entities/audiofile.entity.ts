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
class AudioFileCredit {
  @Field()
  artist_credit: string;

  @Field()
  source: string;

  @Field()
  music_type: string;
}

@ObjectType()
@Entity({
  name: "audiofile",
  orderBy: {
    id: "DESC",
  },
})
export class Audiofile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
  })
  filename: string;

  @ManyToOne(() => User, (user) => user.audiofiles, { onDelete: "CASCADE" })
  @Field(() => User)
  user: Promise<User>;

  @Field(() => AudioFileCredit)
  @Column({
    type: "jsonb",
    nullable: false,
  })
  file_credit: AudioFileCredit;

  @OneToOne(() => Song, (song) => song.audiofile)
  @Field(() => Song)
  song: Promise<Song>;
}
