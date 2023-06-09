import React from "react"

import { Card } from "../ui/card"
import { techIcons } from "../utils/icons"

export const TechsCard = (props: { techs: string[] }): JSX.Element => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10">
      {props.techs.map((tech: string, i) => {
        const techImg = techIcons[tech.toLowerCase().replace("-", "")]
        return (
          <div>
            <div className="self-center" key={i}>
              {techImg}
            </div>
            <p className="text-center text-sm">{tech}</p>
          </div>
        )
      })}
    </div>
  )
}
