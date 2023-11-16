import React from "react";
import { cn } from "@/lib/utils";

export function TypographyH2({children,classNames}:{children:React.ReactNode,classNames?:string|null}) {
    return (
      <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",classNames)}>
        {children}
      </h2>
    )
  }
  