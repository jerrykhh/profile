import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Pin } from "lucide-react"

import { getBlog } from "@/lib/get/blog/getBlog"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

export const OverviewBlogs = (props: {
  blogKeys: Array<string>
  showFullDesc: boolean
}) => {
  return (
    <React.Fragment>
      {props.blogKeys.map((key: string, i) => {
        const blog = getBlog(key)
        return (
          <Link href={`/blog/${blog.metadata.uri}`} key={i}>
            <div className=" max-w-[12rem]">
              <Card>
                <CardHeader className="space-y-0 p-0">
                  <div className="relative h-[12rem] w-full">
                    <Image
                      className="absolute left-0 top-0 h-full w-full rounded-sm object-cover"
                      src={`${blog.metadata.icon}`}
                      alt={`${blog.metadata.title} image`}
                      width={200}
                      height={200}
                    />
                  </div>
                </CardHeader>
              </Card>
              <div className="py-2">
                <h6 className="text-sm font-bold">{blog.metadata.title}</h6>
                <p
                  className={
                    `text-xs ` + (!props.showFullDesc ? "truncate" : "")
                  }
                >
                  {blog.metadata.description}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </React.Fragment>
  )
}
