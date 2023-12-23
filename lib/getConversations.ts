import { auth } from "@clerk/nextjs";
import { db } from "./db";
import ConversationUser from "@/types/types";

const getConversations = async () => {
  const { userId } = auth();

  const currentUser = await db.user.findUnique({
    where: {
      userId: userId as string,
    },
  });

  const conversationIdsOfCurrentUser = await db.user.findUnique({
    where: {
      userId: userId as string,
    },
    select: {
      conversationIds: true,
    },
  });

  const conversationIds = conversationIdsOfCurrentUser?.conversationIds || [];

  const conversations = await db.conversation.findMany({
    where: {
      id: {
        in: conversationIds,
      },
    },
    select: {
      lastMessage: true,
      lastMessageAt: true,
      users: true,
    },
    orderBy: {
      lastMessageAt: "desc",
    },
  });

  const users:ConversationUser[] = conversations.map((conversation) => {
    // Extracting the relevant user information
    const user =
      conversation.users.find((user) => user.id!==currentUser?.id) || {};

    return {
      ...user,
      lastMessageAt: conversation.lastMessageAt,
      lastMessage: conversation.lastMessage,
    };
  })



  return users;
};

export default getConversations;
