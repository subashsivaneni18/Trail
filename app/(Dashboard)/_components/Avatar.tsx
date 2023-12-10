import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from 'react'

interface AvatarIconProps{
  imgUrl:string | null
}

const AvatarIcon:React.FC<AvatarIconProps> = ({
  imgUrl
}) => {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={imgUrl!!} />
      </Avatar>
      <div className="absolute w-[12px] h-[12px] rounded-full bg-green-400 bottom-1 right-0">

      </div>
    </div>
  );
}

export default AvatarIcon

