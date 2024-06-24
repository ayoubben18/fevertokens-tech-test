import React from "react";
import { ModeToggle } from "./ThemeToggle";
import { CircleHelp, HomeIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className=" top-0 flex py-6 px-10 justify-between">
      <ModeToggle />
      <Link href={`/`}>
        {" "}
        <HomeIcon />
      </Link>
      <HoverCard>
        <HoverCardTrigger>
          <CircleHelp className="w-6 h-6" />
        </HoverCardTrigger>
        <HoverCardContent>
          This is a challenge made by Ayoub Bensalah for FeverTokens :)
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default NavBar;
