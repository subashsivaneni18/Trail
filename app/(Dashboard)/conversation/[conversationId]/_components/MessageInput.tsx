"use client"
import { Input } from '@/components/ui/input'
import React, { useCallback, useState } from 'react'
import SendIcon from './SendIcon';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface MessageInputProps {
    conversationId: string
}

const MessageInput:React.FC<MessageInputProps> = ({
    conversationId
}) => {

    const [text,setText] = useState("")
    const router = useRouter()

    const onSend = useCallback(async()=>{
        try {
            await axios.post(`/api/message/${conversationId}`,{text:text})
            setText('')
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    },[text])

  return (
    <div className="fixed w-[80vw] bottom-0 shadow-lg bg-[#F5F5F5] z-50 ">
      <div className="p-5 border flex w-full justify-center">
        <div className="flex w-full gap-x-10 items-center">
          <div className="w-[10%] text-center">O</div>

          <div className="w-[70%]">
            <Input
              placeholder="Type Something"
              className="rounded-2xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            onClick={() => onSend()}
            disabled={text.length === 0}
            className="w-fit"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput
