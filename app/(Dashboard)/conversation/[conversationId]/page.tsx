
import React from 'react'
import MessageInput from './_components/MessageInput'
import MessagesPortion from './_components/MessagesPortion'
import { getMessages } from '@/lib/getMessages'
import { usersInConversation } from '@/lib/usersInConversation'
import Header from '../../_components/Header'
import { OppositeUser } from '@/lib/getOppositeUser'



const page = async ({params}:{
  params:{conversationId:string}
}) => {

  const messages = await getMessages(params.conversationId)
  const usersInCon = await usersInConversation(params.conversationId)
  const oppositeUser = await OppositeUser(params.conversationId)

  

 
  return (
    <div className="flex flex-col">
      <Header isBack oppositeUser={oppositeUser} />

      <div>
        <MessagesPortion messages={messages!!} usersInConv={usersInCon!!}  conversationId={params.conversationId}/>
      </div>
      
      <MessageInput conversationId={params.conversationId} />
    </div>
  );
}

export default page
