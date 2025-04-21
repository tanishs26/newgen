import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ id, title, featuredImg }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (featuredImg) {
      const url = service.getFilePreview(featuredImg);
      setPreviewUrl(url?.href);
      console.log(url);
    }
  }, [featuredImg]);
  
  return (
    <Link to={`/post/${id}`}>
      <div className="w-full bg-gray-800 ">
        <div className="w-full">
          {previewUrl && (
            <img
              src={previewUrl}
              alt={title}
              className="w-full h-48 object-cover"
            />
          )}
          <h2 className="text-2xl text-gray-300 font-bold mt-2">
            {title?.[0]?.toUpperCase() + title?.slice(1) || "Untitled"}
          </h2>

        </div>
      </div>
    </Link>
  );
};

export default PostCard;
