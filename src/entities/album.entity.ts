import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.entity.js";
import { Song } from "./song.entity.js";

export enum AlbumType {
  ALBUM = "album",
  EP = "ep",
}

@ObjectType()
@Entity({
  name: "album",
  orderBy: {
    name: "ASC",
    id: "DESC",
  },
})
export class Album extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.albums, { onDelete: "CASCADE" })
  @Field(() => User)
  @JoinColumn({ name: "user_id" })
  artist: Promise<User>;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: AlbumType,
    default: AlbumType.ALBUM,
  })
  type: AlbumType;

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
    type: "varchar",
    nullable: false,
    default: "-",
  })
  image: string;

  // --- Relations ---
  @OneToMany(() => Song, (song) => song.album, { nullable: true })
  @Field(() => [Song], { nullable: true })
  songs?: Promise<Song[]>;
}
