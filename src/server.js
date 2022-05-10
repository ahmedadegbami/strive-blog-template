import express from "express";
import authorsRouter from "./apis/authors/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();

//This is for request body
server.use(express.json());

server.use("/authors", authorsRouter);

console.table(listEndpoints(server));

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
