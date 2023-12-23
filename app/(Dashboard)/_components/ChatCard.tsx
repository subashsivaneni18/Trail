"use client"
import React from 'react'
import AvatarIcon from './Avatar';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { Message } from '@prisma/client';
import { format } from 'date-fns';

interface ChatCardProps{
   imgUrl:string ,
   username: string ,
   id:string,
   lastmessage?:string
   lastMessadeAt?:Date
}

const ChatCard:React.FC<ChatCardProps> = ({
  imgUrl,
  username,
  id,
  lastmessage,
  lastMessadeAt
}) => {

 const router = useRouter() 

 const onClick = async () =>{
   try {
      const res = await axios.post(`/api/conversation`,{receiverId:id})
      router.push(`/conversation/${res.data.id}`)
   } catch (error) {
    console.log(error)
   }
 }

  return (
    <div
      onClick={() => onClick()}
      className=" hover:bg-[#ea2462] transition cursor-pointer hover:text-[#fefffe] shadow-sm relative"
    >
      <div className="px-4 py-3 flex gap-x-8  items-center ">
        <div>
          <AvatarIcon imgUrl={imgUrl} />
        </div>
        <div className='line-clamp-1'>
          {username}
        </div>
      </div>

      <div className='flex items-center gap-x-2 absolute bottom-0 left-20'>
        <p className=" text-xs bg-muted-foreground line-clamp-1">
          {lastmessage}
        </p>
        <p className=" text-xs text-gray-500 mt-[0.5px]">
          { lastmessage?format(new Date(lastMessadeAt!!), "p"):""}
        </p>
      </div>

    </div>
  );
}

export default ChatCard
