import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity({
  name: "genre",
  orderBy: {
    name: "ASC",
    id: "DESC",
  },
})
export class Genre extends BaseEntity {
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

  @Field()
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
}
