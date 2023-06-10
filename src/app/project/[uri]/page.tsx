import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import Markdown from "markdown-to-jsx"

import { getProject, getProjectsMetadata } from "@/lib/get/project/getProject"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollTooltip } from "@/components/utils/scrollTooltip"

type ProjectPageProps = {
  params: {
    uri: string
  }
}

const ProjectDetailPage = ({ params: { uri } }: ProjectPageProps) => {
  const project = getProject(uri)

  return (
    <React.Fragment>
      <ScrollTooltip />
      <div className="flex-col">
        <Link href="../project">
          <Button variant="link" className="p-0">
            <ArrowLeft className="mr-1 inline-block h-3 w-3" />
            <p>back</p>
          </Button>
        </Link>
        <div className="mt-8 flex flex-col place-content-center items-center gap-4 lg:flex-row lg:items-start">
          <article className="prose-md prose mt-[4rem] self-center dark:text-gray-200 lg:mt-0">
            <Markdown>{project.content}</Markdown>
          </article>
          <div className="order-first max-w-sm lg:order-last">
            <div className="block px-2 sm:gap-4 sm:self-center md:self-start lg:flex">
              <Card>
                <CardHeader>
                  <Image
                    src={project.metadata.icon}
                    width={350}
                    height={350}
                    alt=""
                    className="self-center rounded"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>Project: {project.metadata.name}</CardTitle>
                  <CardDescription>
                    {project.metadata.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href={project.metadata.repository} target="_blank">
                      View repository
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProjectDetailPage

export async function generateStaticParams() {
  const projects = getProjectsMetadata()
  return projects.map((project) => ({
    uri: project.uri,
  }))
}
