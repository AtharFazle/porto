import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Athar from "@/public/static/athar.jpg";

import serialize from "@/lib/renderBody";
import { cn } from "@/lib/utils";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { sosmed } from "@/components/NavigationMenu";
import { Content, Homes } from "@/type/Payload";

async function getDataHomePage() {
  const filePath = path.join(process.cwd(), "app/json", "global.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  return data;
}

export default async function Home() {
  const data = await getDataHomePage();
  return (
    <div className={cn("flex flex-col-reverse gap-y-10 md:flex-row")}>
      <div className="basis-1/2">
        <TypographyH1>
          I’m Athar. I live in South Tangerang{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-red-500 to-white">
            (🇮🇩)
          </span>
          ,<br /> Where I Destroy 🔥 The Worlds 🌍
        </TypographyH1>
        <Link href={"/contact"}>
          <Button
            variant={"shadow"}
            size={"lg"}
            className="my-16 animate-bounce-horizontal"
          >
            Know me More?
          </Button>
        </Link>

        {data?.content?.en?.map((item: Content, index: number) => {
          return (
            <div className="my-8 space-y-5" key={index}>
              <TypographyH1>{item.title}</TypographyH1>
              <div className="space-y-5">
                {serialize(item.description as any)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="basis-1/2 space-y-16">
        <div className="rounded-full w-[250px] sm:w-[300px] md:w-[400px] h-[350px] sm:h-[450px] md:h-[570px] flex justify-end  relative">
          <Image
            src={Athar}
            fill
            alt="athar"
            className="rounded-lg skew-x-6 translate-x-0 sm:translate-x-10 md:translate-x-16 -skew-y-6 shadow-2xl shadow-black"
          />
        </div>
        <ul className="space-y-2 w-full gap-y-4">
          {sosmed.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 justify-end text-3xl hover:underline underline-offset-4 duration-200 transition-all ease-linear"
            >
              {<item.icon />}
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Follow me on {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
