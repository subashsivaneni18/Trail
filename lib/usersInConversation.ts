import { db } from "./db"

export const usersInConversation = async (conversationId:string) =>{
        const users = await db.conversation.findUnique({
            where:{
                id:conversationId
            },
            select:{
                users:true
            }
        })

        const arrayofUsers = users?.users.map(user=>user).flat()
        return arrayofUsers
}