import { BASE_URL, CMS_URL, RevalidateTime } from "@/lib/constant";
import React, { FC } from "react";
import qs from "qs";
import { DataArticles, responseArticles } from "@/type/Payload";
import { TypographyH1 } from "@/components/typography";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import Avatars from "@/components/fragments/Avatar";
import { Separator } from "@/components/ui/separator";
import renderBody from "@/lib/renderBody";
import { ArticleProps } from "@/type/ArticleProps";
import { Query } from "./QueryArticle";



async function getData({ params }: { params: ArticleProps["params"] }) {
  const url = `${CMS_URL}/api/articles${Query(params.slug)}`;
  const response = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching data Article");
  }
  const data: responseArticles = await response.json();
  const DataBeforeReturn = data.docs.map((item) => ({
    id: item.id,
    title: item.title,
    headingImg: item.headingImg,
    description: item.description,
    meta: item.meta,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    slug: item.slug,
  }));
  return DataBeforeReturn[0];
}

export async function generateMetadata({ params }: { params: ArticleProps["params"] }) {
  const url = `${CMS_URL}/api/articles${Query(params.slug)}`;
  const response = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching data Article");
  }
  const data: responseArticles = await response.json();
  const DataBeforeReturnMeta = data.docs.map((item) => ({
    meta:item.meta
  }));
  const meta = DataBeforeReturnMeta[0].meta
  return {
    title: meta?.title,
    description: meta?.description,
    alternates: {
      canonical: `id/articles/detail/${params.slug}`,
      languages: {
        id: `id/articles/detail/${params.slug}`,
      },
    },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      siteName: "AtharFaz",
      locale: "id",
      url: `${BASE_URL}/article/${params.slug}`,
      type: "website",
    },
    twitter: {
      title: meta?.title,
      description: meta?.description,
      card: "summary_large_image",
    },
  };
}
export async function generateStaticParams() {
  const url = `${CMS_URL}/api/articles`;

  const res = await fetch(url, {
    next: {
      revalidate: RevalidateTime,
    },
  });

  if (!res.ok)
    throw new Error(
      "Cannot contact CMS or CMS returned invalid value for pages"
    );

  const data: responseArticles = await res.json();
  console.log(data)

  if (!data) {
    throw new Error("failed to fetch data");
  }

  return data.docs.map((item) => ({
    slug: item.slug,
  }));
};

const Article: FC<ArticleProps> = async ({ params }) => {
  const data = await getData({ params });
  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="w-full h-64 sm:h-72 md:h-96 relative">
        <Image
          src={`${CMS_URL}${data.headingImg.url}`}
          alt={data.headingImg.alt}
          className="rounded-md shadow-xl"
          fill
        />
      </div>
      <TypographyH1>{data.title}</TypographyH1>
      <div className="border-l border-slate-500 text-slate-500 px-5">
        {formatDate(data.createdAt)}
      </div>
      <div className="flex flex-row items-center gap-2">
        <Avatars />{" "}
        <div className="flex flex-col gap-0.5 text-sm">
          <h1 className="font-semibold">Athar Fazle</h1>
          <h2 className="text-primary">@atharFaz</h2>
        </div>
      </div>
      <Separator className="h-[3px]"/>

      <div>{renderBody(data.description)}</div>
    </div>
  );
};

export default Article;
