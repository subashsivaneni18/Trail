"use client"
import { Input } from '@/components/ui/input'
import React, { useCallback, useState } from 'react'
import SendIcon from './SendIcon';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/lib/uploadthing';



interface MessageInputProps {
    conversationId: string
}

const MessageInput:React.FC<MessageInputProps> = ({
    conversationId
}) => {

    const [text,setText] = useState("")
    const [media,setMedia] = useState("")
    
    const router = useRouter()

    const onSend = useCallback(async()=>{
        try {
            await axios.post(`/api/message/${conversationId}`,{
              text:text,
              media:media
            })
            console.log(media)
            setText('')
            setMedia("")
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    },[text,media])

  return (
    <div className="fixed w-[100vw] md:w-[80vw] bottom-0 shadow-lg bg-[#F5F5F5] z-50 ">
      <div className="p-5 border flex w-full justify-center items-center">
        <div className="flex w-full gap-x-10 items-center">
          <div className="w-[10%] text-center">
            <div className=''>
               <UploadButton
               appearance={{
                 button:{
                  width:'100px'
                 }
               }}
                endpoint='MessageImage'
                onClientUploadComplete={ async (res:any)=>{
                   await setMedia(res?.[0]?.url)
                   
                }}
                onUploadError={(error:Error)=>console.log(error)}
               />
            </div>
          </div>

          <div className="w-[70%]">
            <Input
              placeholder="Type Something"
              className="rounded-2xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            onClick={() => onSend()}
            disabled={text.length === 0 || media.length===0}
            className="w-fit"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput
