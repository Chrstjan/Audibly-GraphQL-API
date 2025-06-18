import { Resolver, Query, Arg, Ctx, Authorized } from "type-graphql";
import { Genre } from "../entities/genre.entity.js";
import { UserRole } from "../entities/user.entity.js";

@Resolver()
export class genreResolver {
  @Query(() => [Genre])
  async genres() {
    return Genre.find();
  }

  @Query(() => Genre, { nullable: true })
  async genre(@Arg("id") id: number) {
    return Genre.findOneBy({ id });
  }

  @Authorized([UserRole.ADMIN, UserRole.ARTIST])
  @Query(() => [Genre])
  async privateGenres(@Ctx() context: any) {
    return Genre.find();
  }
}
