"use client"
import React, { FC } from "react";
import { ModeToggle } from "./fragments/toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Links } from "./NavigationMenu";
import Avatars from "./fragments/Avatar";
import { usePathname } from "next/navigation";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const path = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className={cn("flex items-center justify-between w-full px-10 pt-5",isScrolled && "sticky top-0 z-50 py-5 backdrop-blur-lg")}>
      <Avatars/>
      <div
        className={cn(
          "hidden md:flex flex-row items-center gap-7 font-semibold",
          "px-7 rounded-full border shadow-lg dark:bg-zinc-800 dark:border-none from-primary/10 to-transparent bg-gradient-to-tl"
        )}
      >
        {Links.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={cn("text-sm py-3",path.includes(item.link) && "text-primary bg-gradient-to-t from-primary/80 from-3% to-transparent to-5% border-primary")}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className={cn("block md:hidden")}></div>
      <div className="flex flex-row items-center gap-3">
        <div className={cn("block md:hidden")}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className={cn("rounded-full px-5 py-3 bg-accent border-2 ")}>Menu</div>
              </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Links.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={item.link}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
