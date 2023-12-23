"use client"
import { User } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import AvatarIcon from './Avatar';

interface HeaderProps{
  isBack?:boolean,
  oppositeUser?:User
}

const Header:React.FC<HeaderProps> = ({
  isBack,
  oppositeUser
}) => {

  const pathName = usePathname()
  const router = useRouter()

  const isHome = pathName==='/'
  const isUsersPage = pathName.includes('/users')
  const isConversationPage = pathName.includes(`/conversation`)


  return (
    <div className="fixed w-full top-0 z-50 overflow-visible">
      <div className=" bg-[#ea2462] text-[#fefffe] p-5 ">
        <div className="flex gap-x-1 items-center">
          {isBack && (
            <div className="text-white cursor-pointer " onClick={router.back}>
              <ArrowLeft />
            </div>
          )}
          <p className="font-bold text-xl">{isHome && "Home"}</p>
          <p className="font-bold text-xl">{isUsersPage && "Users"}</p>
          {isConversationPage && (
            <div className="flex items-center gap-x-2 ">
              <div className='rounded-lg '>
                <AvatarIcon
                 imgUrl={oppositeUser?.imageUrl!!}
                />
              </div>
              <p className="font-bold text-xl">{oppositeUser?.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header
