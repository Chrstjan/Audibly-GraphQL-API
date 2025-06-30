import { Resolver, Mutation, Arg, Query, Authorized, Ctx } from "type-graphql";
import { Album } from "../entities/album.entity.js";
import { UserRole } from "../entities/user.entity.js";
import { AuthCheckType } from "../lib/types/auth.js";
import { CreateAlbum } from "./types/album.input.js";
import { AlbumService } from "../services/album.service.js";

@Resolver(() => Album)
export class AlbumResolver {
  @Query(() => Album, { nullable: false })
  async singleAlbum(@Arg("slug") slug: string) {
    return Album.findOneBy({ slug });
  }

  @Authorized([UserRole.ARTIST, UserRole.ADMIN])
  @Mutation(() => Album)
  async createAlbum(
    @Ctx() context: AuthCheckType,
    @Arg("data") data: CreateAlbum
  ) {
    const jwtUser = context.user;
    if (!jwtUser) throw new Error("Unauthorized");

    return AlbumService.createAlbum(data, jwtUser.id);
  }
}
