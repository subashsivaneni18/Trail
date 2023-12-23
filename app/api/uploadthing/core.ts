import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = ()=>{
    const {userId} = auth()

    if(!userId)
    {
        throw new Error('Unauthorized')
    }
    return {userId}
}
export const ourFileRouter = {
  
    MessageImage:f({image:{maxFileSize:'64MB',maxFileCount:1}})
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{}),

    ProfileImage:f({image:{maxFileSize:'32MB',maxFileCount:1}})
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{})
  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
