import { db } from '@/lib/db'
import React from 'react'
import MessageInput from './_components/MessageInput'
import MessagesPortion from './_components/MessagesPortion'
import { getMessages } from '@/lib/getMessages'
import { usersInConversation } from '@/lib/usersInConversation'



const page = async ({params}:{
  params:{conversationId:string}
}) => {

  const messages = await getMessages(params.conversationId)
  const usersInCon = await usersInConversation(params.conversationId)
  return (
    <div className='flex flex-col'>
      <MessagesPortion
       messages={messages!!} 
       usersInConv={usersInCon!!}
       />
      <MessageInput conversationId={params.conversationId}/>
    </div>
  )
}

export default page
