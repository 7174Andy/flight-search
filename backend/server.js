import mongoose from "mongoose";
import { gql, ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./.env" });

const uri = process.env.MONGO_DB_URI;

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

// GraphQL
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
    allUsers: async () => {
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("User not found");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token };
    },

    register: async (_, { username, password }) => {
      if (!username || !password) {
        throw new Error("Invalid input");
      }

      const existingUser = await User.findOne({
        username,
      });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
      });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token };
    },
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
