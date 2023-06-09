import { Pin } from "lucide-react";
import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { getBlog } from "@/lib/get/blog/getBlog";

export const OverviewBlogs = (props: { blogKeys: Array<string> }) => {

    return (
        <div className="flex gap-8">
            {props.blogKeys.map((key: string) => {
                const blog = getBlog(key);
                return (
                    <Link href={`/blog/${blog.metadata.uri}`} key={blog.metadata.uri}>
                        <div className=" max-w-[12rem]" >
                            <Card>
                                <CardHeader className="space-y-0 p-0">
                                    <div className="min-w-[12rem] max-w-[12rem] min-h-[12rem] max-h-[12rem] relative">
                                        <Image className="rounded-sm absolute top-0 left-0 w-full h-full object-fill" src={`${blog.metadata.icon}`} alt={`${blog.metadata.title} image`} width={200} height={200} />
                                    </div>
                                </CardHeader>
                            </Card>
                            <div className="py-2">
                                <h6 className="text-sm font-bold">
                                    {blog.metadata.title}
                                </h6>
                                <p className="truncate text-xs">{blog.metadata.description}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )

}