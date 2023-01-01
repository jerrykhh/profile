import React from 'react'
import { getProject, getProjectsMetadata } from '../../../lib/get/project/getProject';
import Markdown from 'markdown-to-jsx'
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
    params: {
        title: string;
    };
}

const ProjectPage = ({ params: { title } }: ProjectPageProps) => {

    const project = getProject(title);

    return (
        <React.Fragment>
            <div className="w-full p-2 font-light">
                <Link href='/project'>
                    <button className='text-lg hover:text-rebeccapurple'>&lt; Back</button>
                </Link>
            </div>

            <div className="flex flex-col xl:flex-row mt-8 gap-4 ">
                <div className="bg-neutral-900 p-8 rounded grow border border-neutral-600">
                    <article className="prose prose-stone text-white min-w-full marker:text-white prose-h1:border-b prose-h1:py-3">
                        <Markdown>{project.content}</Markdown>
                    </article>
                </div>
                <div className='px-2 order-first xl:order-last md:flex md:gap-4 md:self-center xl:block xl:self-start xl:max-w-[350px]'>
                    <Image src={project.metadata.icon} width={350} height={350} alt='' className='rounded' />
                    <div className="p-2">
                        <div className="py-2">
                            <h4>Project Name:</h4>
                            {project.metadata.name}
                        </div>
                        <div className="py-2">
                            <h4>About</h4>
                            <p className='text-justify'>{project.metadata.description}</p>
                        </div>
                        {project.metadata.tag !== '' ?
                            <div className="py-2 text-rebeccapurple">
                                {project.metadata.tag}
                            </div>
                            : <></>
                        }

                        <div className="py-2">
                            {project.metadata.language}
                        </div>

                        <div className="py-2">
                            <a href={project.metadata.repository} target='_blank' rel="noreferrer">
                                <button className='w-full px-4 py-2 bg-blue-600 rounded disabled:bg-transparent disabled:cursor-not-allowed disabled:border disabled:border-blue-700 disabled:text-blue-700  text-sm hover:bg-blue-500' disabled={(project.metadata.repository === '' ? true : false)}>View repository</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}


export default ProjectPage;

export async function generateStaticParams() {
    const projects = getProjectsMetadata();
    return projects.map(project => ({
        title: project.uri
    }))
}