import conf from "../conf/conf.js";

import { Client, Databases, ID, Storage, Query, Permission, Role } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // Map exactly to your Appwrite collection attribute names
            // Ensure featuredimages is always a string (empty if no image)
            const imageValue = featuredImage || "";
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredimages: imageValue, // required column - always set
                    stats: status || "active",
                    userid: userId,                // required column
                }
            );
        } catch (err) {
            console.log("Appwrite service::createPost:: error", err);
            throw err; // Re-throw so caller can see the error
        }
    }


    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredimages: featuredImage,
                    stats: status,
                }
            );
        } catch (err) {
            console.log("Appwrite service::updatePost:: error", err);
        }
    }


    async deletePost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            );
            return true;
            }catch(err){
                console.log("Appwrite service::deletePost:: error", err);
                return false;
            }
    }

    async getPostsByUser(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            );
            }catch(err){
                console.log("Appwrite service::getPostsByUser:: error", err);
                return false;
            }
    }

    // New helper to get a single post by slug/id
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            );
        }catch(err){
            console.log("Appwrite service::getPost:: error", err);
            return false;
        }
    }

    // New helper matching existing component usage: getPosts(...)
    // Ordered by creation time so newest posts appear first
    async getPosts(){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                [Query.orderDesc('$createdAt')]
            );
        }catch(err){
            console.log("Appwrite service::getPosts:: error", err);
            return false;
        }
    }
    //file upload service
    async uploadFile(file){
        try{
            // Validate file type
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
            const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
            
            if (!allowedTypes.includes(file.type)) {
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    console.error(`File extension not allowed: ${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`);
                    throw new Error(`File type not allowed. Please use: PNG, JPG, JPEG, GIF, or WEBP`);
                }
            }
            
            // Since file security is disabled, bucket permissions are used
            // File-level permissions are ignored, so we don't need to set them
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        }catch(err){
            console.log("Appwrite service::uploadFile:: error", err);
            if (err.message && err.message.includes("File extension not allowed")) {
                console.log("Make sure your bucket allows these file extensions: png, jpg, jpeg, gif, webp");
                console.log("Check your Appwrite bucket settings -> File security -> Allowed file extensions");
            } else {
                console.log("Make sure your bucket 'Users' role has 'Create' permission enabled");
            }
            throw err; // Re-throw to let PostForm handle it
        }
    }

    async deleteFile(fileId){
        try{
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }catch(err){
            console.log("Appwrite service::deleteFile:: error", err);
            return false;
        }
    }

    getFilePreview(fileId){
        try{
            if (!fileId || typeof fileId !== 'string') {
                return null;
            }
            // When File Security is disabled, use getFileView for public access
            // getFileView uses bucket-level permissions (requires "Any" role with Read)
            // If File Security is enabled, use getFilePreview (requires file-level permissions)
            // For now, we'll use getFileView since File Security is disabled
            try {
                const url = this.bucket.getFileView(
                    conf.appwriteBucketId,
                    fileId
                );
                return url;
            } catch (viewError) {
                // Fallback to getFilePreview if getFileView fails
                console.warn("getFileView failed, trying getFilePreview:", viewError);
                const url = this.bucket.getFilePreview(
                    conf.appwriteBucketId,
                    fileId
                );
                return url;
            }
        }catch(err){
            console.error("Appwrite service::getFilePreview:: error", err, "fileId:", fileId);
            console.error("Make sure bucket 'Any' role has 'Read' permission enabled");
            return null;
        }
    }
}

const service = new Service();
export default service;