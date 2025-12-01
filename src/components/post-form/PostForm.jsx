import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            // FIX — generate slug if missing
            if (!data.slug || data.slug.trim() === "") {
                data.slug = slugTransform(data.title);
                setValue("slug", data.slug);
            }
    
            // Validate and sanitize content field
            // Ensure content is a string and max 500 characters
            let content = data.content || "";
            if (typeof content !== "string") {
                content = String(content || "");
            }
            
            // Trim whitespace
            content = content.trim();
            
            // Check if content exceeds 500 characters (Appwrite limit)
            if (content.length > 500) {
                // Get plain text for user-friendly message
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = content;
                const plainText = tempDiv.textContent || tempDiv.innerText || "";
                alert(`Content is too long (${content.length} characters including formatting). Maximum allowed is 500 characters. Please shorten your content.`);
                return; // Stop submission if content is too long
            }
            
            // Ensure content is not empty
            if (!content || content === "") {
                alert("Content cannot be empty. Please add some content to your post.");
                return;
            }
    
            let fileId = post?.featuredimages || post?.featuredImage || undefined;
            
            // Upload new image if provided
            if (data.image && data.image[0]) {
                try {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file && file.$id) {
                        fileId = file.$id;
                        // Delete old image if updating
                        if (post?.featuredimages || post?.featuredImage) {
                            appwriteService.deleteFile(post.featuredimages || post.featuredImage);
                        }
                    } else {
                        console.error("Image upload failed - continuing without image");
                    }
                } catch (uploadError) {
                    console.error("Image upload error:", uploadError);
                    alert(uploadError.message || "Image upload failed. Please check file type and bucket settings.");
                    // Continue without image
                }
            }
    
            // Ensure featuredImage is set (even if empty string for required field)
            const payload = { 
                ...data, 
                content: content, // Use sanitized content
                featuredImage: fileId || "" // Empty string if no image
            };
    
            let dbPost;
            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, payload);
            } else {
                if (!userData?.$id) {
                    alert("You must be logged in to create a post.");
                    return;
                }
                dbPost = await appwriteService.createPost({
                    ...payload,
                    userId: userData.$id,
                });
            }
    
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                alert("Post creation/update failed. Please try again.");
                console.error("Post creation/update failed: no dbPost returned");
            }
        } catch (err) {
            console.error("Error submitting post form:", err);
            // Show user-friendly error message
            const errorMessage = err.message || "An error occurred while submitting the post. Please try again.";
            alert(`Error: ${errorMessage}`);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}