import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Pin } from "lucide-react"

import { getProject, getProjectsMetadata } from "@/lib/get/project/getProject"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

export const OverviewProjects = (props: {
  projectKeys: Array<string>
  showFullDesc: boolean
}) => {
  return (
    <React.Fragment>
      {props.projectKeys.map((key: string, i) => {
        const project = getProject(key)
        return (
          <Link href={`/project/${project.metadata.uri}`} key={i}>
            <div className="max-w-[12rem]">
              <Card>
                <CardHeader className="space-y-0 p-0">
                  <Image
                    className=" rounded-sm"
                    src={project.metadata.icon}
                    alt={`${project.metadata.name} image`}
                    width={200}
                    height={200}
                  />
                </CardHeader>
              </Card>
              <div className="py-2">
                <h6 className="text-sm font-bold">{project.metadata.name}</h6>
                <p
                  className={
                    `text-xs ` + (!props.showFullDesc ? "truncate" : "")
                  }
                >
                  {project.metadata.description}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </React.Fragment>
  )
}
