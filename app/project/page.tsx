import { TypographyH1, TypographyH4, TypographyP } from "@/components/typography";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CMS_URL, RevalidateTime } from "@/lib/constant";
import { DataProject, responseProject } from "@/type/Payload";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { MdLink } from "react-icons/md";

interface ProjectProps {}

async function getData() {
  const url = `${CMS_URL}/api/Projects?locale=en&draft=false&depth=1`;
  const response = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });

  if (!response.ok) {
    return null;
  }
  const data: responseProject = await response.json();

  return data.docs.map((item: DataProject) => ({
    id: item.id,
    name: item.name,
    description: item.desc,
    HeadingImg: item.HeadingImg,
    link: item.link,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

const Project: FC<ProjectProps> = async ({}) => {
  const data = await getData();
  return (
    <div className="space-y-10">
      <div className={cn("max-w-xl text-left")}>
        <TypographyH1>Things that I have done 👷</TypographyH1>
        <TypographyP>
          These projects reflect my insatiable curiosity and drive to explore
          new things. Some projects from my professional engagements cannot be
          published due to confidentiality reasons.
        </TypographyP>
      </div>
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ")}
      >
        {data?.map((item, index) => {
          return (
            <Link  href={item.link} target="_blank" key={index} className="space-y-5 p-5 border-2 border-primary/60 md:border-none rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 ease-in duration-200 group cursor-pointer">
              <div className="relative w-full h-40 lg:w-80 lg:h-48 shadow-lg dark:shadow-primary/50">
                <Image
                  src={`${item.HeadingImg.url}`}
                  alt={item.HeadingImg.alt}
                  className="rounded-md"
                  fill
                />
              </div>
              <div
                className={cn(
                  "cursor-pointer transition-colors duration-200 ease-linear",
                   "bg-slate-200 dark:bg-slate-700",
                   "w-fit text-xs",
                  "px-3 py-1 rounded-md"
                )}
              >
                {formatDate(item.updatedAt)}
              </div>
              <p className="font-semibold text-base">{item.name}</p>
              <TypographyP classNames={"text-slate-600 dark:text-slate-400 text-sm"}>{item.description}</TypographyP>
              <div className="w-full flex flex-row gap-1 items-center justify-center group-hover:text-primary duration-200 ease-linear pt-16 group-hover:animate-bounce-horizontal">
                <MdLink className={cn("text-xl")}/>
              <p className="text-sm">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
