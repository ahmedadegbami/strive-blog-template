import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsFilePath = join(dataFolderPath, "authors.json");
const blogsFilePath = join(dataFolderPath, "blogs.json");
const commentsFilePath = join(dataFolderPath, "comments.json");

export const readBlogs = () => readJSON(blogsFilePath);
export const writeBlogs = (blogs) => writeJSON(blogsFilePath, blogs);
export const readAuthors = () => readJSON(authorsFilePath);
export const writeAuthors = (authors) => writeJSON(authorsFilePath, authors);
export const readComments = () => readJSON(commentsFilePath);
