import { TypographyH1 } from "@/components/typography";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { SocialMedia } from "@/components/contact/socialMedia";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div>
      <TypographyH1>My Biodata</TypographyH1>

      <Separator className="my-6 md:my-12 h-[2px] dark:bg-white/70" />
      <div className="flex flex-col-reverse md:flex-row-reverse gap-x-12 gap-y-12  w-full">
        <div className="flex flex-col gap-5 basis-2/3">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="flex flex-row gap-2 items-center text-3xl">
                Biodata Athar Fazle Mawla
              </CardTitle>
              <CardDescription>My Biodata</CardDescription>
            </CardHeader>
            <CardContent className="text-right">
              <div className="flex flex-row gap-5 text-left">
                <div className="basis-1/3 space-y-3">
                  <h1>Name </h1>
                  <h2>Date of Birth</h2>
                  <h3>Address</h3>
                  <h4>Phone</h4>
                  <h5>Email</h5>
                </div>
                <div className="basis-2/3 font-semibold space-y-3">
                  <h1>Athar Fazle Mawla</h1>
                  <h2>13 July 2005</h2>
                  <h3>JL. DANAU RAWA PENING H5 / D8</h3>
                  <h4>(+62) 812 5997 1975</h4>
                  <h5>atharfazle202 / athargithub | @gmail.com</h5>
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <SocialMedia />
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <a
                  href="/Athar Fazle Mawla_Frontend Engineer.pdf"
                  download={true}
                >
                  Download CV
                </a>
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-semibold">Contact me on :</h1>
            <div className="grid grid-cols-2 gap-5 items-center">
            <Link
              href={
                "https://api.whatsapp.com/send?phone=+6281259971975&text=Hi,Athar%20can%20we%20talk%20%3F"
              }
              className="flex flex-row items-center gap-5 shadow-xl hover:scale-105 duration-200 ease-linear p-3 rounded-lg bg-green-600 text-white "
            >
              <FaWhatsapp className="text-xl"/>
              Whatsapp
            </Link>
            <Link
              href={
                "https://www.instagram.com/athar_faz/"
              }
              className="flex flex-row items-center gap-5 shadow-xl hover:scale-105 duration-200 ease-linear p-3 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white "
            >
              <FaInstagram className="text-xl"/>
              Instagram
            </Link>
            <Link
              href={
                "mailto:atharfazle202@gmail.com?subject=Hi%20Athar&body=Can%20we%20talk%3F"
              }
              className="col-span-2 flex flex-row items-center gap-2 justify-center shadow-xl hover:scale-105 duration-200 ease-linear p-3 rounded-lg bg-red-500 text-white "
            >
              <BiLogoGmail className="text-xl"/>
              Gmail
            </Link>
            </div>
          </div>
        </div>

        <div className="basis-1/3">
          <div className="w-[250px] sm:w-[300px] md:w-[400px] h-[350px] sm:h-[450px] md:h-[570px] relative">
            <Image
              src={`/static/athar.jpg`}
              fill
              alt="athar"
              className="rounded-lg skew-x-6  -skew-y-6 shadow-2xl shadow-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
