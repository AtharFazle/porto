import { cn } from "@/lib/utils"
import React from "react"


export function TypographyH4({children,classNames}:{children:React.ReactNode,classNames?:string|null}) {
    return (
      <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight",classNames)}>
        {children}
      </h4>
    )
  }
  