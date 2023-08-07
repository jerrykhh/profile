"use client"

import { useEffect, useRef } from "react"

interface TypeWriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  loop: boolean
}

const TypeWriter = ({ text, loop, ...props }: TypeWriterProps) => {
  const typingDivEle = useRef<HTMLDivElement>(null)

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const textTyping = async (index: number) => {
    console.log(text.slice(0, index))
    typingDivEle.current!.innerHTML =
      text.slice(0, index) + '<span class="blinking-cursor">|</span>'
    if (index < text.length) setTimeout(textTyping, 150, index + 1)
    else if (index == text.length) {
      if (loop) {
        await delay(10000)
        typingDivEle.current!.innerHTML = " "
        setTimeout(textTyping, 150, 0)
      }
    }
  }

  useEffect(() => {
    if (typingDivEle !== null) setTimeout(textTyping, 150, 0)
  }, [typingDivEle])

  return <div ref={typingDivEle} className="font-mono" {...props} />
}

export default TypeWriter
