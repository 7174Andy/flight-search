import mongoose from "mongoose";
import { gql, ApolloServer } from "apollo-server";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const uri = process.env.MONGO_DB_URI;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
