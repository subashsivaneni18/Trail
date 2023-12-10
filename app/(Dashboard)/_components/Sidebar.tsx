"use client";
import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { usePathname, useRouter } from "next/navigation";


import { Conversation, User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";



interface SideBarProps{
  users?:User[]
}


const Sidebar:React.FC<SideBarProps> = ({
  users
}) => {
  const pathname = usePathname();
  const isUsersPage = pathname.includes("/users");
  const isConversationPage = pathname.includes("/conversation");
  const isHomePage = pathname === "/";
  const {userId} = useAuth()

  const [OppositeUsers, setOppositeUsers] = useState<User[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/conversation");
        setOppositeUsers(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchData();
  }, []);

  

  
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

          {(isHomePage || isConversationPage) && (
            <div>
              {OppositeUsers?.filter((user) => user.userId!==userId).map((x) =>(
                <div key={x.id}>
                  <ChatCard
                    id={x.id}
                    username={x.name}
                    imgUrl={x.imageUrl}
                    key={x.id}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
