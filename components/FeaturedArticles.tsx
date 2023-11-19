import { CMS_URL, RevalidateTime } from "@/lib/constant";
import React from "react";
import {
  TypographyH1,
  TypographyH2,
} from "./typography";
import { responseArticles } from "@/type/Payload";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { MdChevronRight } from "react-icons/md";

async function getData() {
  const url = `${CMS_URL}/api/Articles?locale=en&draft=false&depth=1&limit=5`;
  const fetched = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });
  if (!fetched.ok) {
    return null;
  }
  const data: responseArticles = await fetched.json();
  return data.docs.map((item) => ({
    id: item.id,
    title: item.title,
    meta: item.meta,
    slug:item.slug,
    headingImg: item.headingImg,
  }));
}

export default async function FeaturedArticles() {
  const data = await getData();
  return (
    <div className="space-y-10">
      <TypographyH2>Featured Article</TypographyH2>
      <div className={cn("flex flex-col")}>
        {data?.map((item) => (
          <Link
          href={`/article/${item.slug}`}
            className={cn(
              "flex flex-col group md:flex-row gap-5 p-5 md:p-10",
              "rounded-lg hover:bg-slate-200 duration-200 ease-linear dark:hover:bg-slate-700"
            )}
            key={item.id}
          >
            <div className="basis-1/3">
              <div className="w-full h-56 md:h-[152px] relative">
                <Image
                  className="rounded-lg shadow-lg shadow-primary/50 group-hover:shadow-primary"
                  src={`${item.headingImg.url}`}
                  alt={item.headingImg.alt}
                  fill
                />
              </div>
            </div>
            <div className="basis-2/3 flex flex-col gap-3 text-sm">
              <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">{item.title}</h1>
              <h2 className="text-slate-500">{item.meta.description}</h2>
              <div

                className="text-primary group-hover:underline underline-offset-2 flex flex-row gap-1 items-center"
              >
                Read This Article<MdChevronRight className="group-hover:animate-bounce-horizontal text-lg"/>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="group">
        <Link href={"/article"}>
          <Button className="w-full group-hover:underline underline-offset-2 py-5 align-middle">
            Read All Articles <ChevronRightIcon className="group-hover:animate-bounce transition-all duration-150" fontSize={24}/>
          </Button>
        </Link>
      </div>
    </div>
  );
}
