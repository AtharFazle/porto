import React from "react"
import { cn } from "@/lib/utils"

export function TypographyH3({children,classNames}:{children:React.ReactNode,classNames?:string|null}) {
    return (
      <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight",classNames)}>
        {children}
      </h3>
    )
  }
  