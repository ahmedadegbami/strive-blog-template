import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createError from "http-errors";
import { checkBlogPostSchema, checkValidationResult } from "./validation.js";

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
blogPostsRouter.get("/", (req, res, next) => {
  try {
    const blogs = readBlogs();
    if (req.query && req.query.category) {
      const filteredBlogs = blogs.filter(
        (blog) => blog.category === req.query.category
      );
      res.send(filteredBlogs);
    } else {
      res.send(blogs);
    }
  } catch (error) {
    next(error); // this will jump to the first error handler
  }
});

// POST a new blog
blogPostsRouter.post(
  "/",
  checkBlogPostSchema,
  checkValidationResult,
  (req, res, next) => {
    try {
      const blogs = readBlogs();
      const newBlog = { ...req.body, createdAt: new Date(), _id: uniqid() };
      blogs.push(newBlog);
      writeBlogs(blogs);
      res.send(newBlog);
    } catch (error) {
      next(error);
    }
  }
);

// GET a blog by id
blogPostsRouter.get("/:blogId", (req, res, next) => {
  try {
    const blogs = readBlogs();
    const foundBlog = blogs.find((blog) => blog._id === req.params.blogId);
    if (foundBlog) {
      res.send(foundBlog);
    } else {
      //   res.status(404).send("Blog not found");
      next(createError(404, `Blog with id ${req.params.blogId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

// PUT a blog by id
blogPostsRouter.put("/:blogId", (req, res) => {
  try {
    const blogs = readBlogs();
    const index = blogs.findIndex((blog) => blog._id === req.params.blogId);
    if (index !== -1) {
      const oldBlog = blogs[index];
      const newBlog = { ...oldBlog, ...req.body };
      blogs[index] = newBlog;
      writeBlogs(blogs);
      res.send(newBlog);
    } else {
      //   res.status(404).send("Blog not found");
      next(createError(404, `Blog with id ${req.params.blogId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a blog by id
blogPostsRouter.delete("/:blogId", (req, res) => {
  try {
    const blogs = readBlogs();
    const remBlog = blogs.filter((blog) => blog._id !== req.params.blogId);
    if (remBlog) {
      writeBlogs(remBlog);
      res.send();
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
