import React,{FC} from "react"
import { Links } from "./NavigationMenu";
import Link from "next/link";


interface FooterProps {}


const Footer:FC<FooterProps> = ({}) => {
  return (
    <footer className="text-xs text-center mx-auto border-t py-2 md:text-base space-y-2 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-normal md:justify-between items-center">
      <div className="flex flex-row">
        {Links.map((item,index) => {
          return(
            <Link href={`${item.link}`} className="border-r-2 px-2 hover:text-primary duration-200 ease-linear" key={index}>{item.name}</Link>
          )
        })}
      </div>

      <div className=" text-gray-500">© 2023 Athar Fazle Mawla. All rights reserved.</div>
    </footer>
  )
};

export default Footer;
