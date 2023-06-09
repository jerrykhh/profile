import React from "react";
import { techIcons } from "../utils/icons"
import { Card } from "../ui/card"

export const TechsCard = (props: { techs: string[] }): JSX.Element => {

    return (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 place-items-center">
            {props.techs.map((tech: string) => {
                const techImg = techIcons[tech.toLowerCase().replace("-", "")];
                return <div>
                    <div className="self-center">{techImg}</div>
                    <p className="text-center text-sm">{tech}</p>
                </div>
            })
            }
        </div>
    )


}