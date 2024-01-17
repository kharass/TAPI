import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { express as expressMiddleware } from "graphql-voyager/middleware";
import { studentsRouter } from "../server/routes/students.js";

// Przykładowe dane
const students = [
  { id: 1, name: "Alicja", surname: "Kowal", email: "akowal@wp.pl" },
  { id: 2, name: "Marek", surname: "Marucha", email: "mmarucha@wp.pl" },
  { id: 3, name: "Janek", surname: "Nowak", email: "jnowak@wp.pl" },
];

const typeDefs = `
  type Student {
    id: Int
    name: String
    surname: String
    email: String
  }
  
  type Course {
    id: Int
    name: String
    department: String
    lecturer: String
    room: Int
    date: String
    duration: String
  }
  
  type Group {
    id: Int
    course: Int
    lecturer: Int
    room: Int
    students: [Int]
  }
  
  type Lecturer {
    id: Int
    name: String
    surname: String
    email: String
    course: Int
  }
  
  type Room {
    id: Int
    course: Int
  }
  
  type Query {
    students: [Student]
    student(id: Int): Student
  }
`;

const resolvers = {
  Query: {
    students: () => students,
    student: (parent, args) => students.find(s => s.id === args.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

export const app = express();

app.use("/graphql", cors(), express.json(), expressMiddleware({ endpointURL: "/graphql" }));

app.use(cors({ origin: "*" }));

server.applyMiddleware({ app });

app.listen(8989, () => {
  console.log(`Started on port: ${8989}!`);
});
