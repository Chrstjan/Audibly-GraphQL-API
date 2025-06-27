import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/user.entity.js";
import { Genre } from "./entities/genre.entity.js";
import { Audiofile } from "./entities/audiofile.entity.js";

dotenv.config();
const PORT: number = parseInt(String(process.env.DBPORT));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DBHOST,
  port: PORT,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  logging: true,
  synchronize: true,
  entities: [User, Genre, Audiofile],
});
