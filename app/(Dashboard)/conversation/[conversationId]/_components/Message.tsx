"use client"
import {  useAuth } from "@clerk/nextjs";
import { CheckCircle } from "lucide-react";
import React from "react";
import {format} from 'date-fns'
import AvatarIcon from "@/app/(Dashboard)/_components/Avatar";
import { User } from "@prisma/client";

interface MessageProps {
  text: string;
  senderId: string;
  receiverId: string;
  createdAt:Date
  usersInConv:User[]
}

const MessageStyle: React.FC<MessageProps> =  ({ text, senderId, receiverId,createdAt,usersInConv}) => {
  
  const {userId} = useAuth()

  const receiver = usersInConv.filter(user=>user.id===receiverId).pop()
  const sender = usersInConv.filter(user=>user.id===senderId).pop()

  
    const ourMessage = sender?.userId===userId
  
    return (
      <>
        <div
          className={`w-[60vw] flex  ${ourMessage?"justify-end":"justify-start"}`}
        >
          <div className="w-fit h-fit flex-col ">
            <div className="flex gap-x-1">
              <div className="">
                {/* place an avvatar */}
                <AvatarIcon imgUrl={sender?.imageUrl!!} />
              </div>

              <div
                className={`
                max-w-[450px] 
                min-w-fit
                relative
                px-5 py-2
                rounded-full
                text-white 
                font-semibold
                ${ourMessage ? "bg-[#ea2462]" : "bg-sky-500"}
                `}
              >
                {text}
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-1 mt-[3px]">
              <div>
                <CheckCircle size="15px" />
              </div>
              <p className="text-right text-xs text-gray-500 mt-[0.5px]">
                {format(new Date(createdAt),'p')}
              </p>
            </div>
          </div>
        </div>
      </>
    );
};

export default MessageStyle;
