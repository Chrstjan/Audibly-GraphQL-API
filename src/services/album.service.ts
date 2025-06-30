import { User } from "../entities/user.entity.js";
import { ImageFile } from "../entities/image_file.entity.js";
import { Album } from "../entities/album.entity.js";
import { generateUniqueSlug } from "../lib/helpers/generateUniqueSlug.js";
import { CreateAlbum } from "../resolvers/types/album.input.js";

export class AlbumService {
  static async createAlbum(data: CreateAlbum, userID: number): Promise<Album> {
    const user = await User.findOneBy({ id: userID });
    if (!user) throw new Error("User not found");

    const image = await ImageFile.findOne({
      relations: ["user"],
      where: { id: data.image.id },
    });

    if (!image) {
      throw new Error("Image not found");
    }

    if (!image.user || image.user.id !== user.id)
      throw new Error("Image does not belong to user");

    const slug = await generateUniqueSlug(Album, data.name, "slug");

    const album = Album.create({
      artist: user,
      type: data.type,
      name: data.name,
      slug,
      image,
    });

    await album.save();
    return album;
  }
}
