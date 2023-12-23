"use client";
import React from "react";
import { Bell, Home, Settings, Users } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import ToolbarIcon from "./ToolbarIcon";
const IconMap = [
  {
    Icon: Home,
    url: "/",
  },
  {
    Icon: Bell,
    url: "/notifications",
  },
  {
    Icon: Users,
    url: "/users",
  },
];

const MobileToolBar = () => {
  const pathname = usePathname();
  const isConversationPage = pathname.includes('/conversation')
  const isUsersPage = pathname==='/users'
  const isHomePage = pathname==='/'

  return (
    <>
      {(isUsersPage || isHomePage) && (
        <div className="p-5 flex justify-center w-full border">
          <div className="flex gap-x-8 justify-evenly w-[100%]">
            <div>
              <UserButton afterSignOutUrl="/" />
            </div>
            {IconMap.map((i) => (
              <ToolbarIcon
                icon={i.Icon}
                url={i.url}
                key={i.url}
                isActive={i.url === pathname}
              />
            ))}
            <div>
              <Settings />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileToolBar;
