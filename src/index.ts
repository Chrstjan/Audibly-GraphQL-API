import { AppDataSource } from "./data.source.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { AuthChecker, buildSchema } from "type-graphql";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { AuthCheckType } from "./lib/types/auth.js";
import { getUserFromToken } from "./lib/utils/auth.utils.js";
import { AuthResolver } from "./resolvers/auth.resolver.js";
import { RoleResolver } from "./resolvers/role.resolver.js";
import { GenreResolver } from "./resolvers/genre.resolver.js";
import { AlbumResolver } from "./resolvers/album.resolver.js";

dotenv.config();

await AppDataSource.initialize();

const port = process.env.PORT;

const app = express();
//Dev cors
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(graphqlUploadExpress());

const userAuthChecker: AuthChecker<AuthCheckType> = ({ context }, roles) => {
  const user = context.user;
  if (!user) return false;
  //Only requires access token (default user role)
  if (roles.length === 0) return true;
  //Requires role other than user(artist, admin)
  return roles.includes(user.role);
};

const schema = await buildSchema({
  resolvers: [AuthResolver, RoleResolver, GenreResolver, AlbumResolver],
  validate: true,
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
        let token: string = "";
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
