import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Markdown from 'markdown-to-jsx'
import { getBlog, getBlogsMetadata } from '../../../lib/get/blog/getBlog'

type BlogPageProps = {
    params: {
        title: string
    }
}

function BlogPage({ params: { title } }: BlogPageProps) {

    const blog = getBlog(title);

    return (
        <React.Fragment>
            <div className="w-full p-2 font-light">
                <Link href='/blog'>
                    <button className='text-lg hover:text-rebeccapurple'>&lt; Back</button>
                </Link>
            </div>
            <div className="blog">
                <div className="row">
                    <h1>{blog.metadata.title}</h1>
                    <span className='subtitle'>Published on {blog.metadata.date}</span>
                </div>
                <div className='row'>
                    <Image src={blog.metadata.icon} width={1194} height={600} alt={`${blog.metadata.title} cover`} className='lg:max-h-[54rem] object-cover' />
                </div>

                <div className="row lg:px-44 max-2xl:">

                    <article className="prose prose-stone text-white min-w-full marker:text-white prose-h1:border-b prose-h1:py-3">
                        <Markdown>{blog.content}</Markdown>
                    </article>

                </div>
            </div>

        </React.Fragment>
    )
}

export default BlogPage

export async function generateStaticParams() {
    const posts = getBlogsMetadata();
    return posts.map(post => ({
        title: post.uri
    }))
}