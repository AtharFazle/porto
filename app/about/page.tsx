import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import getUrl from "@/lib/getUrl";
import { sosmed } from "@/components/NavigationMenu";
import Link from "next/link";
import { CMS_URL, RevalidateTime } from "@/lib/constant";
import { Content, Homes } from "@/type/Payload";
import renderBody from "@/lib/renderBody";

async function getDataAboutPage() {
  const url = `${CMS_URL}/api/globals/Home?locale=en&draft=false&depth=1`;
  const res = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });
  if (!res.ok) {
    return null;
  }
  const data: Homes = await res.json();

  return data;
}

export default async function About() {
  const url = getUrl();
  const data = await getDataAboutPage();
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
        <Button variant={"shadow"} size={"lg"} className="my-16">
          Contact Me
        </Button>

        {data?.content.map((item :Content, index) => {
          return (
            <div className="mb-16" key={index}>
              <TypographyH1>{item.title}</TypographyH1>

              {renderBody(item.description)}
            </div>
          );
        })}

      </div>
      <div className="basis-1/2 space-y-16">
        <div className="rounded-full w-[250px] sm:w-[300px] md:w-[400px] h-[350px] sm:h-[450px] md:h-[570px] flex justify-end  relative">
          <Image
            src={`${CMS_URL}${data?.heading_image?.url}`}
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
              {<item.icon/>}
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
