import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.entity.js";
import { Song } from "./song.entity.js";

@ObjectType()
@Entity({
  name: "song_contributor",
  orderBy: {
    id: "DESC",
  },
})
export class SongContributor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Song, (song) => song.contributors, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => Song, { nullable: true })
  song?: Promise<Song>;

  @ManyToOne(() => User, (user) => user.contributions, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @Field(() => User, { nullable: true })
  user?: Promise<User>;

  @Column({
    type: "varchar",
    default: "No role provided",
  })
  role: string;
}
