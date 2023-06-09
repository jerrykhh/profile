import React from "react"
import Link from "next/link"

import { Icon, Icons } from "../utils/icons"

export const Vccard = (props: {
  items: {
    [key: string]: {
      title: string
      url: string
    }
  }
}): JSX.Element => {
  return (
    <React.Fragment>
      {Object.keys(props.items).map((key: string, i) => {
        const VccardItem = Icons[key]
        const profileItem = props.items[key]
        return (
          <Link key={i} href={profileItem.url} target="_blank" rel="noreferrer">
            <div className="px-1 py-2">
              <div className="flex gap-4 text-sm">
                <VccardItem className="h-5 w-5" />
                {profileItem.title}
              </div>
            </div>
          </Link>
        )
      })}
    </React.Fragment>
  )
}
