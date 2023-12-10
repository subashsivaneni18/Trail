"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MessageStyle from './Message';
import { Message, User } from '@prisma/client';


interface MessagesPortionProps{
  messages:Message[]
  usersInConv:User[]
}

const MessagesPortion:React.FC<MessagesPortionProps> = ({
  messages,
  usersInConv
}) => {

  return (
    <div>
      <div className="h-[80vh] overflow-y-auto p-20">
        {messages.map((message) => (
          <MessageStyle
            senderId={message.senderId}
            text={message.text}
            receiverId={message.receiverId}
            key={message.id}
            createdAt={message.createdAt}
            usersInConv={usersInConv}
          />
        ))}
      </div>
    </div>
  );
}

export default MessagesPortion;
