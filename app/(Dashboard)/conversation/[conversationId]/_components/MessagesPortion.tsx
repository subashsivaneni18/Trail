"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MessageStyle from './Message';
import { Message, User } from '@prisma/client';
import { pusherClient } from '@/lib/pusher';
import { useRouter } from 'next/navigation';


interface MessagesPortionProps{
  messages:Message[]
  usersInConv:User[]
  conversationId:string
}


const MessagesPortion:React.FC<MessagesPortionProps> = ({
  messages,
  usersInConv,
  conversationId
}) => {

  const router = useRouter()

  useEffect(()=>{
    pusherClient.subscribe(conversationId!!)

    

    pusherClient.bind("newMessage",()=>{
      router.refresh()
    })

    

  },[conversationId])

  return (
    <div className=''>
      <div className="h-[80vh] overflow-y-auto p-20">
        {messages?.map((message) => (
          <MessageStyle
            senderId={message.senderId}
            text={message.text!!}
            receiverId={message.receiverId}
            key={message.id}
            createdAt={message.createdAt}
            usersInConv={usersInConv}
            isImage={message.media?.length!==0}
            image={message.media!!}
            seenIds={message.seenIds}
          />
        ))}
      </div>
    </div>
  );
}

export default MessagesPortion;
