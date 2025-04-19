import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
const PostCard = ({ $id, title, featuredImg }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 ">
        <div className="w-full">
          <img src={service.getFilePreview(featuredImg)} alt={title} />
          <h2 className="text-2xl text-gray-300 font-bold">
            {title[0].toUpperCase() + title.slice(1)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
