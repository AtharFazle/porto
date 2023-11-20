import { BodyItem, Child, Content } from "@/type/Payload";
import Link from "next/link";
import Image from "next/image";
import {Text} from "slate"
import { CMS_URL } from "./constant";
import clsx from "clsx";
import escapeHTML from "escape-html";

function renderBodyItem(item: BodyItem, index: number): JSX.Element | string | undefined {
  const headingStyles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "text-sm",
    h6: "text-xs",
  };

  if (Text.isText(item)) {
    let string = escapeHTML(item.text);
    if ((item as Child).bold) {
      string = `<strong>${string}</strong>`;
    }
    if ((item as Child).italic) {
      string = `<em>${string}</em>`;
    }
    if ((item as Child).underline) {
      string = `<u>${string}</u>`;
    }
    if ((item as Child).strikethrough) {
      string = `<del>${string}</del>`;
    }
    if ((item as Child).code) {
      string = `<code>${string}</code>`;
    }
    return <span key={index} className="" dangerouslySetInnerHTML={{ __html: string }}></span>;
  }

  const children = item.children?.map((i, idx) => renderBodyItem(i, idx));

  if (item.type === "h1" || item.type === "h2" || item.type === "h3" || item.type === "h4" || item.type === "h5" || item.type === "h6") {
    const HeadingElement = item.type as keyof typeof headingStyles;
    return (
      <HeadingElement
        key={index}
        className={clsx(
          headingStyles[item.type]
        )}
      >
        {children}
      </HeadingElement>
    );
  }

  if (item.type === "link") {
    return (
      <Link
        key={index}
        href={item.url || "*"}
        className="underline capitalize duration-200 hover:text-blue-500"
      >
        {children}
      </Link>
    );
  }

  if (item.type === "upload") {
    return (
      <figure className="flex flex-col my-10 gap-1 justify-center items-center" key={index}>
        <Image
          className="rounded-sm"
          src={`${item.value!.url}`}
          alt={item.value!.alt}
          width={item.value!.width}
          height={item.value!.height}
        />
        {item.value?.caption &&
          item.value?.caption.map((caption: any, index: number) => (
            <figcaption className="italic text-gray-500" key={index}>
              {renderBodyItem(caption, index)}
            </figcaption>
          ))
        }
      </figure>
    );
  }

  if (item.type === "ol") {
    return (
<ol className=" list-decimal mt-64" key={index} style={{ listStylePosition: 'inside' }}>
  {children}
</ol>

    );
  }

  if (item.type === "ul") {
    return (
      <ul className="list-disc mt-64" key={index} style={{ listStylePosition: 'inside' }}>
        {children}
      </ul>
    );
  }

  if (item.type === "li") {
    return <li className="text-right" key={index}>{children}</li>;
  }

  // Default case if 'type' is not present or doesn't match any expected values
  return <p className={clsx("leading-7 text-left [&:not(:first-child)]:mt-6")} key={index}>{children}</p>;
}


export default function renderBody(body:BodyItem[]) {
  return body.map((item,idx) => renderBodyItem(item,idx))
}