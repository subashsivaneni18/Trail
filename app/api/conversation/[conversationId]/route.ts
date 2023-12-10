import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId: senderId } = auth();
    const { receiverId } = await req.json();
    if (!senderId || senderId === null || typeof senderId !== "string") {
      throw new Error("Unauthorized");
    }
    if (!receiverId || receiverId === null || typeof receiverId !== "string") {
      throw new Error("Unauthorized");
    }

    const isAlreadyExist = await db.conversation.findFirst({
      where: {
        userIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (isAlreadyExist) {
      return NextResponse.json(isAlreadyExist, { status: 200 });
    }

    if (!isAlreadyExist) {
      
      const conversation = await db.conversation.create({
        data: {
          userIds: [senderId, receiverId],
        },
      });

      const userIds =  conversation.userIds

     const updatesSender = await db.user.update({
       where: {
         id: senderId
       },
       data: {
         conversationIds: {
           push: conversation.id,
         },
       },
     });
     const updatedreceiver = await db.user.update({
       where: {
         id: receiverId
       },
       data: {
         conversationIds: {
           push: conversation.id,
         },
       },
     });


      if (conversation) {
        return NextResponse.json(updatedreceiver, { status: 200 });
      }
    }
  } catch (error) {
    console.log(["Conversation Error"], error);
    return NextResponse.json("Internal server Error", { status: 500 });
  }
}
