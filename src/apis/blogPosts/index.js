import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const blogPostsRouter = express.Router();

const blogPostsFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blog.json"
);

const readBlogs = () => JSON.parse(fs.readFileSync(blogPostsFilePath));
const writeBlogs = (blogsArray) =>
  fs.writeFileSync(blogPostsFilePath, JSON.stringify(blogsArray));

blogPostsRouter.get("/", (req, res) => {
  const blogs = readBlogs();
  res.send(blogs);
});
blogPostsRouter.post("/", (req, res) => {});
blogPostsRouter.get("/:blogId", (req, res) => {});
blogPostsRouter.put("/:blogId", (req, res) => {});
blogPostsRouter.delete("/:blogId", (req, res) => {});

export default blogPostsRouter;
