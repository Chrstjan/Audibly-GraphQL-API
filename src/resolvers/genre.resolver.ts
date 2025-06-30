import { Resolver, Arg, Query } from "type-graphql";
import { Genre } from "../entities/genre.entity.js";

@Resolver(() => Genre)
export class GenreResolver {
  @Query(() => [Genre])
  async allGenres() {
    return Genre.find();
  }

  @Query(() => Genre, { nullable: false })
  async singleGenre(@Arg("slug") slug: string) {
    return Genre.findOneBy({ slug });
  }
}
