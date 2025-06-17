import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from "typeorm";
import bcrypt from "bcrypt";

export enum UserRole {
  ADMIN = "admin",
  ARTIST = "artist",
  USER = "user",
}

@Entity({
  name: "user",
  orderBy: {
    username: "ASC",
    id: "DESC",
  },
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "string",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "string",
    nullable: false,
  })
  password: string;

  @Column({
    type: "string",
    nullable: false,
    default: "-",
  })
  refresh_token: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @Column({
    type: "string",
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: "string",
    nullable: false,
    default: "-",
  })
  avatar: string;

  @Column({
    type: "string",
    nullable: false,
    default: "No description provided",
  })
  description: string;

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
