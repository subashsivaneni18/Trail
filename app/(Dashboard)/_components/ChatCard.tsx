"use client"
import React from 'react'
import AvatarIcon from './Avatar';
import { useRouter } from 'next/navigation';
import axios from 'axios'

interface ChatCardProps{
   imgUrl:string ,
   username: string ,
   id:string
}

const ChatCard:React.FC<ChatCardProps> = ({
  imgUrl,
  username,
  id
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
    onClick={()=>onClick()}
    className=" hover:bg-[#ea2462] transition cursor-pointer hover:text-[#fefffe] shadow-sm">
      <div className="px-4 py-3 flex gap-x-8  items-center">
        <div>
          <AvatarIcon imgUrl={imgUrl} />
        </div>
        <div>{username}</div>
      </div>
    </div>
  );
}

export default ChatCard
