import React,{FC} from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface AvatarProps {}


const Avatars:FC<AvatarProps> = ({classNames}:{classNames?:string | null}) => {
  return (
    <Link href={"/"}>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>AF</AvatarFallback>
    </Avatar>
  </Link>
  )
};

export default Avatars;
