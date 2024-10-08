import path from "path";
import fs from "fs";
import Link from "next/link";

import { TypographyH1, TypographyP } from "@/components/typography";
import { sosmed } from "@/components/NavigationMenu";
import Carrousel from "@/components/Carrousel/Carrousel";
import { getImage } from "@/lib/getImageCarrousel";

export const dynamic = "force-dynamic";

export default async function About() {
  const dataCarrousel = await getImage();
  return (
    <div>
      <div className="max-w-2xl space-y-10 text-left">
        <TypographyH1>
          Frontend Engineer, TypeScript Addict, based in Tangerang Selatan.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-t from-white to-blue-500 dark:from-secondary dark:to-blue-500">
            Ngalamers.
          </span>
        </TypographyH1>
        <TypographyP>
          Hello My name is{" "}
          <span className="text-primary font-semibold dark:font-medium">
            {" "}
            Athar Fazle Mawla{" "}
          </span>
          , my friend call me{" "}
          <span className="text-primary font-semibold dark:font-medium">
            Athar
          </span>
          . I am a programming enthusiast who has a passion for programming. My
          focus is on{" "}
          <span className="text-primary font-semibold dark:font-medium">
            front-end web applications
          </span>
          . My background is information systems focusing study on specializing
          business flow, leading project and develop a product. My expertise are
          as a{" "}
          <span className="text-primary font-semibold dark:font-medium">
            Front End developer
          </span>
          . I am also have{" "}
          <span className="text-primary font-semibold dark:font-medium">
            3D Artist Experience
          </span>
          . Lets Connect !
        </TypographyP>
        <div className="flex flex-row gap-2">
          {sosmed.map((item) => (
            <Link
              target="_blank"
              aria-label={`Redirect to ${item.name}`}
              href={item.link}
              className="text-4xl text-slate-500 hover:text-primary duration-200 ease-linear"
              key={item.name}
            >
              <item.icon></item.icon>
            </Link>
          ))}
        </div>
      </div>
      <Carrousel data={dataCarrousel} />
      {/* <div className="w-full flex flex-col-reverse gap-y-10 gap-x-5 md:flex-row my-10">
        <div className="basis-2/3"><FeaturedArticles/></div>
        <div className="basis-1/3">
          {" "}
          <Work></Work>
        </div>
      </div> */}
    </div>
  );
}
