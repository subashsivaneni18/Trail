import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req:Request
){
    try {
        const {userId} = auth()
        const {receiverId} = await req.json()
        if(!userId)
        {
            throw new Error("Unauthorized")
        }

        const currentUser = await db.user.findUnique({
            where:{
                userId:userId as string
            }
        })

        if(!currentUser)
        {
            throw new Error("Unauthorized");
        }
        const isAlready = await db.conversation.findFirst({
          where: {
            userIds: {
              hasEvery: [currentUser.id, receiverId],
            },
          },
        });



        if(isAlready)
        {
            return NextResponse.json(isAlready)
        }

        const newConversation = await db.conversation.create({
            data:{
                userIds:[currentUser.id,receiverId]
            }
        })

        const updatedUser1 = await db.user.update({
          data: {
            conversationIds: {
              push: newConversation.id,
            },
          },
          where: {
            id:currentUser.id
          },
        });
        const updatedUser2 = await db.user.update({
          data: {
            conversationIds: {
              push: newConversation.id,
            },
          },
          where: {
            id:receiverId
          },
        });

        return NextResponse.json(updatedUser1)

    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Error")
    }
}

export async function GET(
  req:Request
){
  try {
    const {userId} = auth()

    if(!userId)
    {
      throw new Error("Unauthorized")
    }

    const currentUser = await db.user.findUnique({
      where:{
        userId:userId
      }
    })

    const conversationIds = currentUser?.conversationIds

    const oppositeUsers = await db.conversation.findMany({
      select:{
        users:true
      },
      where:{
        id:{
          in:conversationIds
        }
      },
      orderBy:{
        lastMessageAt:'desc'
      }
    })

    const usersArray = oppositeUsers
      .map((oppositeUser) => oppositeUser.users)
      .flat();

    return NextResponse.json(usersArray);



  } catch (error) {
    console.log(error)
    return NextResponse.json('Internal Error',{status:500})
  }
}