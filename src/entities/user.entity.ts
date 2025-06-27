import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import bcrypt from "bcrypt";

export enum UserRole {
  ADMIN = "admin",
  ARTIST = "artist",
  USER = "user",
}

@ObjectType()
@Entity({
  name: "user",
  orderBy: {
    username: "ASC",
    id: "DESC",
  },
})
export class User extends BaseEntity {
  // --- Basic Info ---
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  password: string;

  @Column({
    type: "varchar",
    nullable: false,
    default: "-",
  })
  refresh_token: string;

  @Field()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
    unique: true,
  })
  username: string;

  @Field()
  @Column({
    type: "varchar",
    nullable: false,
    default: "-",
  })
  avatar: string;

  @Field()
  @Column({
    type: "text",
    nullable: false,
    default: "No description provided",
  })
  description: string;

  // --- entity creation / update methods ---
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith("$2b$")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @BeforeInsert()
  async ensureSingleAdmin(): Promise<void> {
    if (this.role === UserRole.ADMIN) {
      const existingAdmin = await User.findOne({
        where: { role: UserRole.ADMIN },
      });
      if (existingAdmin) {
        throw new Error("An admin user already exists.");
      }
    }
  }
}
