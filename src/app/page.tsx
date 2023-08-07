import React from "react"
import Image from "next/image"
import { Pin } from "lucide-react"

import { profileConfig } from "@/config/profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OverviewBlogs } from "@/components/blog/blogcard"
import { TechsCard } from "@/components/profile/techcard"
import TodoCard from "@/components/profile/todocard"
import { Vccard } from "@/components/profile/vccard"
import { OverviewProjects } from "@/components/project/projectcard"

export default function IndexPage() {
  return (
    <React.Fragment>
      <div className="md:w-fit">
        <div className="justify-center gap-8 md:flex">
          <div className="flex justify-center">
            <div className="min-w-[300px] flex-col">
              <Image
                src={profileConfig.profileIcon}
                alt="Jerry Profile Icon"
                width={300}
                height={300}
                className="rounded-sm object-cover"
              />
              <div className="mt-3 p-2">
                <Vccard items={profileConfig.profileExtendUrls} />
              </div>
            </div>
          </div>
          <div className="mt-4 w-full md:mt-0 lg:max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Hi, I&apos;m {profileConfig.nickname}.
            </h1>
            {profileConfig.intro && profileConfig.intro.length > 0 ? (
              profileConfig.intro.map((ctx) => <p>{ctx}</p>)
            ) : (
              <></>
            )}
            {profileConfig.todos && profileConfig.todos.length > 0 ? (
              <div className="mt-8">
                <TodoCard todolist={profileConfig.todos} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {profileConfig.projects && profileConfig.projects.length > 0 ? (
          <div className="mt-6 w-full">
            <h5 className="text-xl font-bold">Projects</h5>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <OverviewProjects
                  projectKeys={profileConfig.projects}
                  showFullDesc={false}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {profileConfig.blogs && profileConfig.blogs.length > 0 ? (
          <div className="mt-6 w-full">
            <h5 className="text-xl font-bold">Blogs</h5>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                <OverviewBlogs
                  blogKeys={profileConfig.blogs}
                  showFullDesc={false}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {profileConfig.techs && Object.keys(profileConfig.techs).length > 0 ? (
          <React.Fragment>
            <Separator className="my-4" />

            <div className="my-8">
              <h4 className="text-center text-xl font-bold ">Tech Stack</h4>

              {Object.keys(profileConfig.techs).map((key: string) => {
                const techs = profileConfig.techs[key]

                return (
                  <div className="mb-2 mt-8">
                    <h6 className=" font-semibold">
                      {key.toLocaleUpperCase()}
                    </h6>
                    <div className="my-4">
                      <TechsCard techs={techs} />
                    </div>
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  )
}
