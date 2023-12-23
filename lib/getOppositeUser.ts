import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const OppositeUser = async(conversationId:string) =>{

    const {userId} = auth()
    
    const oppositeUser = await db.conversation.findUnique({
        where: {
        id: conversationId,
        },
        select: {
        users: {
            where: {
            userId: {
                not: {
                equals: userId as string,
                },
            },
            },
        },
        },
    })

    const x = oppositeUser?.users.map(user=>user).flat().pop()


    return x

}