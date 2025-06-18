import { User } from "../../entities/user.entity.js";

export type AuthCheckType = {
  user?: User | null;
};
