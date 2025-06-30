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

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;

  @Field()
  @Column({
    type: "varchar",
    default: "No role provided",
    nullable: false,
  })
  role: string;

  @Field(() => Song, { nullable: false })
  @ManyToOne(() => Song, { nullable: false, onDelete: "CASCADE" })
  song!: Song;
}
