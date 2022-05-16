import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = ({ author }) => {
  // const { name, surname, avatar } = props;
  return (
    // <Link to={`/blog/${_id}`} className="blog-link">
    <Card className="blog-card">
      <Card.Img variant="top" src={author.avatar} className="blog-cover" />
      <Card.Body>
        <Card.Title>{author.title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <BlogAuthor author={author} />
      </Card.Footer>
    </Card>
    // </Link>
  );
};

export default BlogItem;
