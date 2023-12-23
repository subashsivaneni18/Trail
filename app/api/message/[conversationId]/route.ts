import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { conversationId: string };
  }
) {
  try {
    const { userId } = auth();
    const { text } = await req.json();

    if (!userId) {
      throw new Error(`Unauthorized`);
    }

    const sender = await db.user.findUnique({
      where: {
        userId: userId,
      },
    });

    const userIds = await db.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
      select: {
        userIds: true,
      },
    })

    const receiverId = userIds?.userIds
      .filter((userId) => userId != sender?.id)
      .pop();

    const newMessage = await db.message.create({
      data: {
        receiverId: receiverId!!,
        text,
        senderId: sender?.id!!,
        conversationId: params.conversationId,
      },
    });

    

    const updatedConversation = await db.conversation.update({
      data: {
        messageIds: {
          push: newMessage.id,
        },
        lastMessage:newMessage.text || "Media",
        lastMessageAt:newMessage.createdAt
      },
      where: {
        id: params.conversationId,
      },
    });

    await pusherServer.trigger(params.conversationId, "newMessage", newMessage);

    return NextResponse.json(updatedConversation, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Message Creation Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { conversationId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error(`Unauthorized`);
    }

    const messages = await db.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
      select: {
        messages: {
          where: {
            conversationId: params.conversationId,
          },
        },
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Message Fetcing Error", { status: 500 });
  }
}
