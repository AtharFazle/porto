
import { CMS_URL, RevalidateTime } from "@/lib/constant";
import { responseJob } from "@/type/Payload";
import React, { FC } from "react";
import { MdWork, MdWorkOutline } from "react-icons/md";
import { TypographyH4, TypographyP } from "./typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

interface WorkProps {}

async function getData() {
  const url = `${CMS_URL}/api/job?locale=en&draft=false&depth=1`;
  const res = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });

  if (!res.ok) {
    return null;
  }
  const data: responseJob = await res.json();
  return data.docs.map((item, index) => ({
    id: item.id,
    title: item.title,
    company: item.company,
    companyLogo: item.companyLogo,
    dateStart: item.dateStart,
    dateEnd: item.dateEnd,
  }));
}

const Work: FC<WorkProps> = async ({}) => {
  const jobData = await getData();
  return (
    <div className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-700/40 p-5 space-y-5">
      <TypographyP
        classNames={"flex flex-row items-center text-sm gap-2 font-medium"}
      >
        <MdWorkOutline className={cn("text-foreground text-xl")} />
        Work
      </TypographyP>

      <ul className={cn("flex flex-col gap-5")}>
        {jobData?.map((item, index) => {

          return (
            <li
              className="flex flex-row gap-3 hover:border-b border-zinc-400 duration-200 ease-linear p-2 rounded-lg "
              key={index}
            >
              <Avatar className="p-0.5 bg-white">
                <AvatarImage
                  className="rounded-full w-20 h-20"
                  src={item.companyLogo.url}
                />
                <AvatarFallback className="text-primary">{item.companyLogo.alt}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 text-xs w-full">
                <p className="font-semibold">{item.company}</p>
                <div className="w-full flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-light">
                  <p className="">{item.title}</p>
                  <p className="">
                    {formatDate(item.dateStart)}-{" "}
                    {item.dateEnd ? formatDate(item.dateEnd) : "Present"}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <Link href="https://www.linkedin.com/in/athar-mawla-0a53031b2/">
          <Button className="flex flex-row w-full items-center gap-2">
            Go To Linkedin <ArrowDownIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Work;
