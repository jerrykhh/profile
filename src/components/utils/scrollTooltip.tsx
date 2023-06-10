"use client"

import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"
import { ArrowUp } from "lucide-react"

import { Button } from "../ui/button"

export const ScrollTooltip = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  const scrollToTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    if (window.pageYOffset != 0)
      scrollToTop()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollPosition > 400 ? (
    <div className="fixed bottom-1 right-1 z-50 flex h-24 w-24 items-center justify-center md:bottom-4 md:right-4 md:h-10 md:w-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-10 rounded-full bg-white p-0 dark:bg-secondary"
              onClick={() => scrollToTop()}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  ) : (
    <></>
  )
}
