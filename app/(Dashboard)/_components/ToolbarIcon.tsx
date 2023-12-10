"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface SettingBarIconProps {
  icon: LucideIcon;
  url: string;
  isActive: boolean;
}

const ToolbarIcon: React.FC<SettingBarIconProps> = ({
  icon: Icon,
  url,
  isActive,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(url)}
      className={cn(
        `
       cursor-pointer transition hover:text-slate-600 flex flex-col items-center
       pb-1
      `,
        isActive &&
          "text-purple-600 border-b-2 border-[#8A2BE2] hover:border-slate-600"
      )}
    >
      <Icon />
    </div>
  );
};

export default ToolbarIcon;
