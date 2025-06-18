import { AppDataSource } from "./data-source.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { AuthChecker, buildSchema } from "type-graphql";
import { AuthCheckType } from "./types/auth/auth.js";
import { authResolver } from "./resolvers/auth.resolver.js";
import { genreResolver } from "./resolvers/genre.resolver.js";
import { getUserFromToken } from "./utils/auth.utils.js";

dotenv.config();

await AppDataSource.initialize();

const port = process.env.PORT;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userAuthChecker: AuthChecker<AuthCheckType> = ({ context }, roles) => {
  const user = context.user;
  if (!user) return false;
  if (roles.length === 0) return true; // Just requires normal user role
  return roles.includes(user.role); // Only if role matches (artist, admin)
};

const schema = await buildSchema({
  resolvers: [authResolver, genreResolver],
  authChecker: userAuthChecker,
});

const server = new ApolloServer({
  schema,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        let token = null;
        if (authHeader?.startsWith("Bearer ")) {
          token = authHeader.split(" ")[1];
        }
        const user = await getUserFromToken(token);
        return { user };
      },
    })
  );

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
};
startServer();
