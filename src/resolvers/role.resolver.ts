import { Resolver, Mutation, Authorized, Ctx } from "type-graphql";
import { User, UserRole } from "../entities/user.entity.js";
import { AuthCheckType } from "../lib/types/auth.js";

@Resolver(() => User)
export class RoleResolver {
  @Authorized([UserRole.USER])
  @Mutation(() => User)
  async upgradeToArtistRole(@Ctx() context: AuthCheckType): Promise<User> {
    const jwtUser = context.user;
    if (!jwtUser) throw new Error("Unauthorized");

    const userAccount = await User.findOne({ where: { id: jwtUser.id } });
    if (!userAccount) throw new Error("User not found");
    if (userAccount.role === UserRole.ARTIST)
      throw new Error("You are already an artist");

    userAccount.role = UserRole.ARTIST;
    await userAccount.save();
    return userAccount;
  }

  @Authorized([UserRole.ARTIST])
  @Mutation(() => User)
  async downgradeFromArtistRole(@Ctx() context: AuthCheckType): Promise<User> {
    const jwtUser = context.user;
    if (!jwtUser) throw new Error("Unauthorized");

    const userAccount = await User.findOne({ where: { id: jwtUser.id } });
    if (!userAccount) throw new Error("User not found");
    if (userAccount.role === UserRole.ARTIST)
      throw new Error("You are already a regular user");

    userAccount.role = UserRole.USER;
    await userAccount.save();
    return userAccount;
  }
}
