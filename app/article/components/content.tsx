"use client";
import React, { FC, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import { CMS_URL } from "@/lib/constant";
import qs from "qs";
import { responseArticles } from "@/type/Payload";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
} from "@/components/typography";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";

interface ContentProps {}

const Content: FC<ContentProps> = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [data, setData] = React.useState<responseArticles>();
  const [debounceSearch] = useDebounce(search, 1000);
  const [loading, setLoading] = React.useState(false);
  const filterValues = ["reflection", "technology"];

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const selectValue = (value: string) => {
    if (value === "all") {
      // If "all" is clicked and filters are already set to "all", clear filters
      setSelectedFilters((prev) =>
        prev.length === filterValues.length ? [] : filterValues
      );
      return;
    }

    setSelectedFilters((prev) => {
      if (prev.includes(value)) {
        // If the value is already in the array, remove it
        return prev.filter((filter) => filter !== value);
      } else {
        // If the value is not in the array, add it
        return [...prev, value];
      }
    });
  };

  React.useEffect(() => {
    const getData = async () => {
      const query = {
        title: {
          like: debounceSearch,
        },
        category: {
          in: selectedFilters,
        },
      };

      const stringifiedQuery = qs.stringify(
        {
          where: query,
          locale: "en",
          draft: "false",
          depth: 1,
          limit: 5,
        },
        { addQueryPrefix: true }
      );

      const url = `${CMS_URL}/api/Articles${stringifiedQuery}`;

      try {
        const fetched = await fetch(url);
        const response: responseArticles = await fetched.json();

        if (!fetched.ok) {
          console.error("Error fetching data:", response);
          return null;
        }
        setLoading(true);
        // Process the fetched data as needed
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [debounceSearch, selectedFilters]);

  return (
    <div className="mt-10 text-slate-500 dark:text-slate-200">
      <div className="max-w-lg">
        <input
          type="text"
          value={search}
          onChange={handleInput}
          placeholder="Search Articles"
          className={cn(
            "border dark:border-zinc-500 w-full",
            "p-3",
            "rounded-sm outline-none",
            "shadow-lg focus-visible:shadow focus-visible:shadow-primary/60",
            "focus-visible:outline-none focus-visible:border-primary dark:focus-visible:border-primary"
          )}
        />
        <div className="flex flex-row items-center my-5 capitalize gap-3 text-sm">
          <h1>Filter : </h1>
          {filterValues.map((item, index) => (
            <p
              key={index}
              onClick={() => selectValue(item)}
              className={cn(
                "cursor-pointer transition-colors duration-200 ease-linear",
                selectedFilters.includes(item)
                  ? "bg-primary text-white"
                  : "bg-slate-200 dark:bg-slate-700",
                "px-3 py-2 rounded-md"
              )}
            >
              {item}
            </p>
          ))}

          <p
            onClick={() => selectValue("all")}
            className={cn(
              "cursor-pointer transition-colors duration-200 ease-linear",
              selectedFilters.length === filterValues.length
                ? "bg-primary text-white"
                : "bg-slate-200 dark:bg-slate-700",
              "px-3 py-2 rounded-md"
            )}
          >
            all
          </p>
        </div>
        {debounceSearch && (
          <p>
            Result for <strong>{debounceSearch}</strong>{" "}
            {selectedFilters.map((item, index) => {
              return (
                <span key={index}>
                  & <strong>{item}</strong> Category
                </span>
              );
            })}
          </p>
        )}
      </div>
      {data && (
        <div className="flex flex-col gap-y-5 border-l my-5">
          {data.docs.map((item, index) => {
            return (
              <Link
                href={`/article/${item.slug}`}
                className="w-full p-2 md:p-5 rounded-md flex flex-row"
                key={index}
              >
                <div className="basis-1/4 text-center hidden md:flex items-center justify-center">
                  {formatDate(item.createdAt)}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-y-10 gap-x-5 basis-4/4 md:basis-3/4 group hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md cursor-pointer  duration-200 ease-in-out p-5">
                  <div className="w-full md:basis-1/3">
                    <div className="w-full h-48 md:h-48 relative ">
                      <Image
                        className="rounded-lg shadow-lg shadow-primary/50 group-hover:shadow-primary"
                        src={`${item.headingImg.url}`}
                        alt={item.headingImg.alt}
                        fill
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 md:gap-10 basis-2/3 relative">
                    <TypographyH4 classNames="w-full">
                      {item.title}
                    </TypographyH4>
                    <div
                      className={cn(
                        "cursor-pointer transition-colors duration-200 ease-linear",
                        "bg-slate-200 dark:bg-slate-700",
                        "w-fit text-xs",
                        "block md:hidden",
                        "px-3 py-1 rounded-md"
                      )}
                    >
                      {formatDate(item.updatedAt)}
                    </div>
                    <p>{item.meta.description}</p>
                    <p
                      className={cn(
                        "group-hover:underline underline-offset-4",
                        "text-primary  flex items-center"
                      )}
                    >
                      Read This Article{" "}
                      <MdChevronRight className="group-hover:animate-bounce-horizontal text-2xl" />
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {loading === true && <div>loading....</div>}
      {/* {data?.totalDocs === 0 && ( */}
      <TypographyH4 classNames={"text-center"}>
        Article Masih On Fix 🤧
      </TypographyH4>
      {/* )} */}
    </div>
  );
};

export default Content;
