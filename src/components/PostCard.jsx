import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, featuredimages }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Appwrite column name is "featuredimages"
  const rawImageId = featuredimages || featuredImage;

  // Validate imageId - real Appwrite file IDs are alphanumeric, usually start with numbers
  const isValidImageId = rawImageId &&
    typeof rawImageId === 'string' &&
    rawImageId.length === 20 && // Appwrite file IDs are typically 20 chars
    /^[a-zA-Z0-9]+$/.test(rawImageId) && // Only alphanumeric, no spaces
    /^[0-9]/.test(rawImageId); // Starts with a number (Appwrite file IDs usually do)

  const imageUrl = isValidImageId
    ? appwriteService.getFilePreview(rawImageId)
    : null;

  useEffect(() => {
    if (!isValidImageId) {
      setImageError(true);
      setImageLoaded(false);
    } else {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [isValidImageId]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/50 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300">
        {/* Image container */}
        <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 relative">
          {imageUrl && isValidImageId && !imageError ? (
            <>
              <img
                src={imageUrl}
                alt={title || "Post image"}
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => {
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={(e) => {
                  setImageError(true);
                  setImageLoaded(false);
                  e.target.style.display = "none";
                }}
                loading="lazy"
              />
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
              <div className="text-4xl mb-2 opacity-50">📄</div>
              <div className="text-xs font-medium">No image</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-lg font-bold text-white line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">
            {title || "Untitled Post"}
          </h2>
          <div className="flex items-center text-xs text-slate-400">
            <span className="inline-flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Read more
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
