import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getProject, getProjectsMetadata } from "@/lib/get/project/getProject";
import { ArrowLeft, Check } from "lucide-react";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProjectPageProps = {
    params: {
        uri: string;
    };
}


const ProjectDetailPage = ({ params: { uri } }: ProjectPageProps) => {

    const project = getProject(uri);

    return (
        <React.Fragment>

            <div className="flex-col">
                <Link href="../project">
                    <Button variant="link" className="p-0">
                        <ArrowLeft className="w-3 h-3 inline-block mr-1" />
                        <p>back</p>
                    </Button>
                </Link>

                <div className="flex flex-col lg:flex-row mt-8 gap-4 place-content-center items-center lg:items-start">

                    <article className="mt-[4rem] lg:mt-0 prose prose-md dark:text-gray-200 self-center">
                        <Markdown>{project.content}</Markdown>
                    </article>
                    <div className="order-first lg:order-last max-w-sm">
                        <div className='px-2 lg:flex sm:gap-4 sm:self-center block md:self-start'>
                            <Card>
                                <CardHeader>
                                    <Image src={project.metadata.icon} width={350} height={350} alt='' className='rounded self-center' />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>Project: {project.metadata.name}</CardTitle>
                                    <CardDescription>{project.metadata.description}</CardDescription>
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

export default ProjectDetailPage;

export async function generateStaticParams() {
    const projects = getProjectsMetadata();
    return projects.map(project => ({
        title: project.uri
    }))
}