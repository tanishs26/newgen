import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/import.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getAllPost([]).then((fetchedPosts) => {
      console.log(fetchedPosts);

      if (fetchedPosts) {
        console.log(fetchedPosts.documents);

        setPosts(fetchedPosts.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full mx-auto p-3">
        <h1 className="text-4xl text-cyan-500 font-semibold text-center text-shadow-amber-50">
          Please login to read posts
        </h1>
      </div>
    );
  } else return (
    <div className="w-full py-8">
      <Container>
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4 bg-amber-300 ">

            <PostCard
              id={post.$id}
              title={post.title}
              featuredImg={post.featuredImg}
            />

          </div>
        ))}
      </Container>
    </div>
  )
};

export default Home;
