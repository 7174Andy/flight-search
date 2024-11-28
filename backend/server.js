import mongoose from "mongoose";
import { gql, ApolloServer } from "apollo-server";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const uri = process.env.MONGO_DB_URI;

const typeDefs = gql`
  type Query {
    hello: String
    allUsers: [User!]!
  }

  type User {
    id: ID!
    name: String!
    password: String!
  }

  type Mutation {
    login(username: String!, password: String!): Token!
    register(username: String!, password: String!): Token!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// Mongoose Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
