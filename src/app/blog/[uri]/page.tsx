import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Markdown from "markdown-to-jsx"

import { getBlog, getBlogsMetadata } from "@/lib/get/blog/getBlog"
import { Button } from "@/components/ui/button"

type BlogDetailPageProps = {
  params: {
    uri: string
  }
}

const BlogDetailPage = ({ params: { uri } }: BlogDetailPageProps) => {
  const blog = getBlog(uri)

  return (
    <React.Fragment>
      <div className="flex-col">
        <Link href="/">
          <Button variant="link" className="p-0">
            <ArrowLeft className="mr-1 inline-block h-3 w-3" />
            <span>back</span>
          </Button>
        </Link>

        <div className="blog flex-col gap-3">
          <div className="row my-4">
            <h1 className="text-2xl font-bold">{blog.metadata.title}</h1>
            <span className="text-sm font-normal text-gray-500">
              Published on {blog.metadata.date}
            </span>
          </div>
          <div className="row">
            <Image
              src={blog.metadata.icon}
              width={1194}
              height={600}
              alt={`${blog.metadata.title} cover`}
              className="object-cover lg:max-h-[54rem]"
            />
          </div>

          <div className="row max-2xl: lg:px-44">
            <article className="prose prose-stone min-w-full text-white marker:text-white prose-h1:border-b prose-h1:py-3">
              <Markdown>{blog.content}</Markdown>
            </article>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  const posts = getBlogsMetadata()
  return posts.map((post) => ({
    title: post.uri,
  }))
}

export default BlogDetailPage
