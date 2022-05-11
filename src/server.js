import express from "express";
import authorsRouter from "./apis/authors/index.js";
import blogPostsRouter from "./apis/blogPosts/index.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

const server = express();

//This is for request body
server.use(express.json());
server.use(cors());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter);

console.table(listEndpoints(server));

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
