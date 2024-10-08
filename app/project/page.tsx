import fs from "fs";
import path from "path";
import { TypographyH1, TypographyP } from "@/components/typography";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
// import { CMS_URL, RevalidateTime } from "@/lib/constant";
import { DataProject } from "@/type/Payload";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { MdLink } from "react-icons/md";

interface ProjectProps {}

async function getData() {
  const filePath = path.join(process.cwd(), "app/json", "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return data.map((item: DataProject) => ({
    id: item.id,
    name: item.name,
    desc: item.desc,
    HeadingImg: item.url,
    link: item.link,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export const dynamic = "force-dynamic";

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
        {data.map((item: DataProject, index: number) => {
          return (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              className="space-y-5 p-5 border-2 border-primary/60 md:border-none rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 ease-in duration-200 group cursor-pointer"
            >
              <div className="relative w-full h-40 lg:w-80 lg:h-48 shadow-lg dark:shadow-primary/50">
                <Image
                  src={item.HeadingImg}
                  alt={item.name}
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
                {/* {formatDate(item.updatedAt)} */}
              </div>
              <p className="font-semibold text-base">{item.name}</p>
              <TypographyP
                classNames={"text-slate-600 dark:text-slate-400 text-sm"}
              >
                {item.desc}
              </TypographyP>
              <div className="w-full flex flex-row gap-1 items-center justify-center group-hover:text-primary duration-200 ease-linear pt-16 group-hover:animate-bounce-horizontal">
                <MdLink className={cn("text-xl")} />
                <p className="text-sm">Link Website</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
