import appwrite from "../conf/conf";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(appwrite.appwriteUrl)
      .setProject(appwrite.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, featuredImg, content, status, userid }) {
    try {
      return await this.databases.createDocument(
        appwrite.appwriteDatabaseId,
        appwrite.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("Create Post error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        appwrite.appwriteDatabaseId,
        appwrite.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.log("Update Post error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        appwrite.appwriteDatabaseId,
        appwrite.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Delete post error", error);
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        appwrite.appwriteDatabaseId,
        appwrite.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Get post error", error);
    }
  }
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        appwrite.appwriteDatabaseId,
        appwrite.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Get list error", error);
    }
  }
  async fileUpload(file) {
    try {
      return await this.bucket.createFile(
        appwrite.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("file error");
    }
  }
  async deleteFile(fileid) {
    try {
      this.bucket.deleteFile(appwrite.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      console.log("File delete error ", error);
    }
  }
  async getFilePreview(fileId) {
    try {
      // console.log("Fetching preview for file:", fileId);
      // console.log("Using bucket ID:", import.meta.env.VITE_BUCKET_ID);

      const result = this.bucket.getFileView(
        import.meta.env.VITE_BUCKET_ID,
        fileId
      );

      return result;
    } catch (error) {
      console.error("File preview error:", error);
      throw error;
    }
  }
}

const service = new Service();
export default service;
