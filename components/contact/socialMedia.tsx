"use client"
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { sosmed } from "../NavigationMenu";

type Props = {};

export const SocialMedia = (props: Props) => {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>Social Media </AccordionTrigger>
      <AccordionContent className="flex flex-row items-center justify-center gap-2">
    {
      sosmed.map((item,index) =>(
        <Link key={index} href={item.link}>
          {<item.icon className="w-10 h-10 text-primary dark:text-white"/>}
        </Link>
      ))
    }
      </AccordionContent>
    </AccordionItem>
  );
};
