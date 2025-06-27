import { Resolver, Mutation, Arg, Field, Query } from "type-graphql";

@Resolver()
export class RoleResolver {
  @Query(() => String)
  hello(): string {
    return "hello world";
  }
}
