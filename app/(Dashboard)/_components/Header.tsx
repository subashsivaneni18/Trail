import { ArrowLeft } from 'lucide-react';
import React from 'react'

interface HeaderProps{
  isBack?:boolean
}

const Header:React.FC<HeaderProps> = ({
  isBack
}) => {
  return (
    <div className=" bg-[#ea2462] text-[#fefffe] p-5">
      <div className='flex gap-x-3'>
        {isBack && (
          <div className="text-white cursor-pointer ">
            <ArrowLeft />
          </div>
        )}
        <p className="font-bold text-xl">Username</p>
      </div>
    </div>
  );
}

export default Header
