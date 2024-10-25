import config from "../conf/config.js"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,content,image,status,userID}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    image,
                    status,
                    userID,
                }
            )            
        } catch (error) {
            console.log('Appwrite service :: createPost :: error',error); 
            return false;           
        }
    }

    async updatePost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )            
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error',error);          
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )   
            return true         
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error',error);  
            return false        
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )           
        } catch (error) {
            console.log('Appwrite service :: getPost :: error',error);         
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )       
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error',error);
            return false             
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )       
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error',error); 
            return false         
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )   
            return true    
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error',error); 
            return false         
        }

    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId,
            ) 
        } catch (error) {
            console.log('Appwrite service :: getfilePreview :: error',error); 
            return false         
        }
    }

    async getPostWithUserInfo(postId) {
        const post = await appwriteService.getPost(postId);
        const user = await appwriteService.getUser(post.userId);
        
        return {
          post,
          user,
        };
    }

}

const service = new Service()

export default service