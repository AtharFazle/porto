import { cn } from "@/lib/utils"
import React from "react"


export function TypographyP({children,classNames}:{children:React.ReactNode,classNames?:string|null}) {
    return (
      <p className={cn("leading-7 text-left [&:not(:first-child)]:mt-6",classNames)}>
        {children}
      </p>
    )
  }
  