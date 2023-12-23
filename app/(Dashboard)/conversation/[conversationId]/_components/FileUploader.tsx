import React from 'react'
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from '@/app/api/uploadthing/core';

interface FileUploaderProps{
    endpoint:keyof typeof ourFileRouter
    onChange:(url?:string)=>void
}

const FileUploader:React.FC<FileUploaderProps> = ({
    endpoint,
    onChange
}) => {
  return (
    <div>
      <UploadDropzone
       endpoint={endpoint}
       onClientUploadComplete={(res)=>onChange(res?.[0].url)}
       onUploadError={(error:Error)=>{
        console.log(error)
       }}
      />
    </div>
  )
}

export default FileUploader
