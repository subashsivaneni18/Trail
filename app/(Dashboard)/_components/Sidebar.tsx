"use client";
import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { usePathname, useRouter } from "next/navigation";


import { Conversation, User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import ConversationUser from "@/types/types";



interface SideBarProps{
  users?:User[]
  conversations:ConversationUser[]
}


const Sidebar:React.FC<SideBarProps> = ({
  users,
  conversations
}) => {
  const pathname = usePathname();
  const isUsersPage = pathname.includes("/users");
  const isConversationPage = pathname.includes("/conversation");
  const isHomePage = pathname === "/";
  const {userId} = useAuth()


  return (
    <div className="border-r h-full flex items-center justify-center relative">
      <div className="h-[95%] flex flex-col">
        <p
          className="
        text-xl 
        font-semibold 
        absolute 
        inset-0 
        top-6 
        left-12 
        right-12 
        h-fit
        border-b-2
        text-center
        "
        >
          {isUsersPage && "Users"}
          {isHomePage && "Conversations"}
          {isConversationPage && "Conversations"}
        </p>
        <div
          className="
         absolute
         inset-0
         top-24
         left-0
         right-0
         overflow-y-auto
         flex 
         flex-col
         gap-y-2
        "
        >
          {isUsersPage && (
            <div className="text-black">
              {users
                ?.filter((user) => user.userId !== userId)
                .map((user) => (
                  <ChatCard
                    id={user.id}
                    imgUrl={user.imageUrl}
                    key={user.id}
                    username={user.name}
                  />
                ))}
            </div>
          )}


          {(isHomePage || isConversationPage) &&
            conversations.map((conversation) => (
              <ChatCard
                key={conversation.id}
                id={conversation.id}
                imgUrl={conversation.imageUrl}
                username={conversation.name}
                lastMessadeAt={conversation.lastMessageAt}
                lastmessage={conversation.lastMessage}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
