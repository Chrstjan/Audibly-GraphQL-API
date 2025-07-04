import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import bcrypt from "bcrypt";
import { User, UserRole } from "../entities/user.entity.js";
import { generateToken } from "../lib/utils/auth.utils.js";
import { LoginInput, SignupInput } from "./types/auth.input.js";

@ObjectType()
class AuthResponse {
  @Field() access_token: string;

  @Field(() => User)
  user: User;
}

@Resolver(() => User)
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput): Promise<AuthResponse> {
    const user = await User.findOneBy({ email: data.username });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const access_token = generateToken(user, "access");
    const refresh_token = generateToken(user, "refresh");

    user.refresh_token = refresh_token;
    await user.save();

    return { access_token, user };
  }

  @Mutation(() => AuthResponse)
  async signup(@Arg("data") data: SignupInput): Promise<AuthResponse> {
    const { email, password, username } = data;

    const userExists = await User.findOneBy({ email: email });
    if (userExists) throw new Error("User with email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      email,
      password: hashedPassword,
      username,
      role: UserRole.USER,
    });

    const access_token = generateToken(newUser, "access");
    const refresh_token = generateToken(newUser, "refresh");

    newUser.refresh_token = refresh_token;
    await newUser.save();

    return { access_token, user: newUser };
  }
}
