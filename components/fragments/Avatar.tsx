import React,{FC} from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {}


const Avatars:FC<AvatarProps> = ({classNames}:{classNames?:string | null}) => {
  return (
    <div>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>AF</AvatarFallback>
    </Avatar>
  </div>
  )
};

export default Avatars;
