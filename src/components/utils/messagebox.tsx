"use client"

import { ClassAttributes, HtmlHTMLAttributes, ReactNode, useState } from "react"
import { Terminal, X } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

type MessageBoxProps = {
  icon: ReactNode
  title: ReactNode
  description: ReactNode
}

export const MessageBox = ({ icon, title, description }: MessageBoxProps) => {
  const [closeAnnoun, setCloseAnnoun] = useState<boolean>(false)
  return !closeAnnoun ? (
    <Alert>
      {icon}
      <div className="ml-2 flex justify-between">
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
        {/* <div
          className="cursor-pointer self-center"
          onClick={() => setCloseAnnoun(!closeAnnoun)}
        >
          <X className="h-4 w-4" />
        </div> */}
      </div>
    </Alert>
  ) : (
    <></>
  )
}
