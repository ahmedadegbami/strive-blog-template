import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const blogPostsRouter = express.Router();

// I concatenate the file path with the file name
const blogPostsFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blog.json"
);
//I created a reusable function to read and write the blogs
const readBlogs = () => JSON.parse(fs.readFileSync(blogPostsFilePath));
const writeBlogs = (blogsArray) =>
  fs.writeFileSync(blogPostsFilePath, JSON.stringify(blogsArray));

// GET all blogs
blogPostsRouter.get("/", (req, res) => {
  const blogs = readBlogs();
  if(req.query && req.query.category) {
      
  res.send(blogs);
});

// POST a new blog
blogPostsRouter.post("/", (req, res) => {
  const blogs = readBlogs();
  const newBlog = { ...req.body, createdAt: new Date(), _id: uniqid() };
  blogs.push(newBlog);
  writeBlogs(blogs);
  res.send(newBlog);
});
blogPostsRouter.get("/:blogId", (req, res) => {});
blogPostsRouter.put("/:blogId", (req, res) => {});
blogPostsRouter.delete("/:blogId", (req, res) => {});

export default blogPostsRouter;
