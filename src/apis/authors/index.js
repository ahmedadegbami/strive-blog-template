import express from "express";
import fs, { readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, parse } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();
// // 1. get the file and convert to path

// const fileName = import.meta.url;
// console.log("Filename:", fileName);

// const filePath = fileURLToPath(fileName);
// console.log("file path:", filePath);

// // 2. get the parent path
// const ParentDir = dirname(filePath);
// console.log("parent dir:", ParentDir);

// // 3. join the parent with the json file
// const jsonFilePath = join(ParentDir, "authors.json");
// console.log("json file path:", jsonFilePath);

const jsonFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);

// get starts here
authorsRouter.get("/", (req, res) => {
  // 1. read the filePath
  const readFile = JSON.parse(fs.readFileSync(jsonFilePath));
  console.log(readFile);
  // 3. send the file path
  res.send(readFile);
});

authorsRouter.post("/", (req, res) => {
  // 1. read the request body
  console.log("req body:", req.body);

  // 2. create a new user object
  const newUser = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log(newUser);

  //3. read the file
  const users = JSON.parse(fs.readFileSync(jsonFilePath));

  //4. push the newUser into the array
  users.push(newUser);

  //5, write the array back to file
  fs.writeFileSync(jsonFilePath, JSON.stringify(users));

  //6 send response
  res.status(201).send({ newUser });
});

authorsRouter.get("/:userid", (req, res) => {
  // 1. obtain userID from url
  const userID = req.params.userid;
  console.log("USER ID:", userID);
  // 2. read the file
  const users = JSON.parse(fs.readFileSync(jsonFilePath));
  // 3. find specific user in ARRAY
  const exactUser = users.find((user) => user.id === userID);
  console.log(exactUser);
  // 4. Send back a proper response
  res.status(200).send(exactUser);
});

authorsRouter.delete("/:userid", (req, res) => {
  // 1. Read file
  const users = JSON.parse(fs.readFileSync(jsonFilePath));

  // 2. filter out the remaining users
  const rem = users.filter((user) => user.id !== req.params.userid);

  // 3. Save the remainer of the Array
  fs.writeFileSync(jsonFilePath, JSON.stringify(rem));

  // 4. Send back a proper response
  res.status(204).send();
});

authorsRouter.put;

export default authorsRouter;
