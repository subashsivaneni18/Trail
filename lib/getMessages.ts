

import { db } from "@/lib/db";

export const getMessages = async (conversationId:string) => {
  
    

    const messages = await db.conversation.findUnique({
        where:{
            id:conversationId
        },
        select:{
            messages:{
                orderBy:{
                    createdAt:'asc'
                }
            }
        }
    })

    

    const arrayofMessages = messages?.messages.map(message=>message).flat()

    return arrayofMessages

    console.log(arrayofMessages)
  
};
