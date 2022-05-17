import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://ahmed-striver.herokuapp.com/authors");
    console.log(response);
    const data = await response.json();
    setAuthors(data);
    console.log(data);
  };

  return (
    <Row>
      {authors.map((author) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem author={author} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
