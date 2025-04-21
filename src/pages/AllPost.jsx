import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/import.js";
const AllPost = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    service.getAllPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      console.log(posts)
    }); 
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className=" flex flex-wrap">
          {posts &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  id={post.$id}
                  title={post.title}
                  featuredImg={post.featuredImg}
                />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
