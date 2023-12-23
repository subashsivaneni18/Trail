type ConversationUser =  {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  imageUrl: string;
  Birthday: Date | null;
  conversationIds: string[];
  seenMessageIds: string[];
  lastMessageAt: Date;
  lastMessage: string; // Replace 'string' with the actual type of lastMessage
}

export default ConversationUser
