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
    Icon: Users,
    url: "/users",
  },
];

const Toolbar = () => {
  const pathname = usePathname();


 
  return (
    <div className="px-5 h-full border-r flex items-center  my-auto">
      <div className="p-2 h-[70vh] flex flex-col justify-evenly  ">
        <div className="h-[10vh] mb-10">
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="flex flex-col space-y-10 ">
          {IconMap.map((icon) => (
            <div key={icon.url}>
              <ToolbarIcon icon={icon.Icon} url={icon.url} isActive={icon.url===pathname} />
            </div>
          ))}
        </div>

        {/* <div className="h-[10vh] cursor-pointer transition hover:text-slate-600 mt-20">
          <Settings />
        </div> */}
      </div>
    </div>
  )
};

export default Toolbar;
