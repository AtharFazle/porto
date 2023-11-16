import { TypographyH1, TypographyP } from "@/components/typography";
import React,{FC} from "react"
import Content from "./components/content";

interface ArticleProps {}


const Article:FC<ArticleProps> = ({}) => {
  return (
    <div>
        <div className="max-w-2xl space-y-5">
        <TypographyH1>Writing on software design and personal reflections. ✍</TypographyH1>
        <TypographyP classNames={""}> All my insightful reflections on programming and personal growth, meticulously arranged in chronological order. </TypographyP>
        </div>
        <Content/>
    </div>
  )
};

export default Article;
