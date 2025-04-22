import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

const PostCard = ({ id, title, featuredImg }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (featuredImg) {
        service.getFilePreview(featuredImg).then((url) => setPreviewUrl(url));
      }
    } catch (err) {
      console.error("Failed to load image preview:", err);
      setError("Image not available");
    } finally {
      setLoading(false);
    }


  }, [featuredImg]);

  const formattedTitle = title
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : "Untitled";

  return (
    <Link to={`/post/${id}`} className="block group">
      <div className="w-full bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="w-full">
          {loading ? (
            <div className="w-full h-48 bg-gray-700 animate-pulse" />
          ) : error ? (
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">{error}</span>
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt={`Featured image for ${formattedTitle}`}
              className="w-full h-48 object-cover"
              onError={() => setError("Failed to load image")}
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <h2 className="text-xl text-gray-300 font-bold p-4">
            {formattedTitle}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;