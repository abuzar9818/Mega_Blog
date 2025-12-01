import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        post && userData
            ? (post.userId || post.userid) === userData.$id
            : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setImageError(false);
                    setImageLoaded(false);
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    const imageId = post.featuredImage || post.featuredimages || post.featuredimage;
                    if (imageId) {
                        appwriteService.deleteFile(imageId);
                    }
                    navigate("/");
                }
            });
        }
    };

    if (!post) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading post...</p>
                </div>
            </div>
        );
    }

    const imageId = post.featuredImage || post.featuredimages || post.featuredimage;
    const imageUrl = imageId ? appwriteService.getFilePreview(imageId) : null;

    // Validate imageId format (Appwrite file IDs are typically 20 chars, alphanumeric, start with number)
    const isValidImageId = imageId &&
        typeof imageId === 'string' &&
        imageId.length === 20 &&
        /^[a-zA-Z0-9]+$/.test(imageId) &&
        /^[0-9]/.test(imageId);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-8">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Image Section */}
                    <div className="w-full mb-8 relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800/50 shadow-xl">
                        {imageUrl && isValidImageId && !imageError ? (
                            <div className="relative w-full aspect-video bg-slate-900">
                                <img
                                    src={imageUrl}
                                    alt={post.title || "Post image"}
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                                        imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => {
                                        setImageLoaded(true);
                                        setImageError(false);
                                    }}
                                    onError={(e) => {
                                        console.error("Failed to load image:", imageUrl);
                                        setImageError(true);
                                        setImageLoaded(false);
                                        e.target.style.display = "none";
                                    }}
                                />
                                {!imageLoaded && !imageError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="w-full aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-slate-800/80 to-slate-900/80 text-slate-500">
                                <div className="text-6xl mb-4 opacity-50">📄</div>
                                <div className="text-sm font-medium">No featured image</div>
                            </div>
                        )}

                        {/* Author Actions */}
                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-3 z-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button 
                                        bgColor="bg-green-500 hover:bg-green-600" 
                                        className="shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    bgColor="bg-red-500 hover:bg-red-600" 
                                    onClick={deletePost}
                                    className="shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            {post.title || "Untitled Post"}
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>

                    {/* Content Section */}
                    <div className="prose prose-invert prose-lg max-w-none browser-css bg-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-800/50 shadow-xl">
                        {parse(post.content || "")}
                    </div>
                </div>
            </Container>
        </div>
    );
}