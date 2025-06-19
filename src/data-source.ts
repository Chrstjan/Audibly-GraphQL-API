import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Genre } from "./entities/genre.entity.js";
import { User } from "./entities/user.entity.js";
import { Album } from "./entities/album.entity.js";
import { Audiofile } from "./entities/audiofile.entity.js";
import { SongImage } from "./entities/song_image.entity.js";
import { Song } from "./entities/song.entity.js";
import { SongContributor } from "./entities/song_contributor.entity.js";

dotenv.config();

const PORT = parseInt(process.env.DBPORT);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DBHOST,
  port: PORT,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  logging: true,
  synchronize: true,
  entities: [Genre, User, Album, Audiofile, SongImage, Song, SongContributor],
});
