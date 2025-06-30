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
class ImageFileCredit {
  @Field()
  artist_credit: string;

  @Field()
  source: string;
}

@ObjectType()
@Entity({
  name: "image",
  orderBy: {
    url: "ASC",
    id: "DESC",
  },
})
export class ImageFile extends BaseEntity {
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

  @Field(() => ImageFileCredit)
  @Column({
    type: "jsonb",
    nullable: false,
  })
  file_credit: ImageFileCredit;
}
