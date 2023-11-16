import { cn } from "@/lib/utils"
import React from "react"

export function TypographyH1({children,classNames,key


}:{children:React.ReactNode,classNames?:string|null,key?:any |null}) {
    return (
      <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",classNames)}>
        {children}
      </h1>
    )
  }
  