import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Song } from "./song.entity.js";

@ObjectType()
@Entity({
  name: "genre",
  orderBy: {
    name: "ASC",
    id: "DESC",
  },
})
export class Genre extends BaseEntity {
  // --- Basic Info ---
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field()
  @Column({
    type: "text",
    nullable: false,
  })
  image: string;

  // --- Relations ---
  @OneToMany(() => Song, (song) => song.genre)
  @Field(() => [Song])
  songs: Promise<Song[]>;
}
