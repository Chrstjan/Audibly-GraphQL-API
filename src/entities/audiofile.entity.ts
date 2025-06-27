import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.entity.js";

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
    url: "ASC",
    id: "DESC",
  },
})
export class Audiofile extends BaseEntity {
  // --- Basic Info ---
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user!: User;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
  })
  url: string;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
  })
  filename: string;

  @Field(() => AudioFileCredit)
  @Column({
    type: "jsonb",
    nullable: false,
  })
  file_credit: AudioFileCredit;
}
