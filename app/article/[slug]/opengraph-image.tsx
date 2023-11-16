import { CMS_URL, RevalidateTime } from "@/lib/constant";
import { ArticleProps } from "@/type/ArticleProps";
import { ImageResponse } from 'next/og'
import { Query } from "./QueryArticle";
import { DataArticles } from "@/type/Payload";

export const contentType = "image/png";
export const runtime = 'edge'

export default async function Image({ params }: {params:ArticleProps["params"]}) {
  console.log(params,"params")
  const url = `${CMS_URL}/api/articles${Query(params.slug)}`;
  console.log(url,"url")
  const data = await fetch(url).then((res) =>
  res.json()
)
const article = data.docs[0]
    return new ImageResponse(
      (
        <div tw="relative flex items-center justify-center bg-black">
          <img
            src={`${CMS_URL}${article?.headingImg.url}`}
            alt={article?.headingImg.alt}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
