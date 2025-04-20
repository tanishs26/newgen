import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/import.js";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config.js";
const EditPost = () => {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
