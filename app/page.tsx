import Image from "next/image"
import { Vccard } from "@/components/profile/vccard"
import { profileConfig } from "@/config/profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pin } from "lucide-react"
import TodoCard from "@/components/profile/todocard"
import { OverviewBlogs } from "@/components/blog/blogcard"
import { Separator } from "@/components/ui/separator"
import { OverviewProjects } from "@/components/project/projectcard"
import React from "react"
import { TechsCard } from "@/components/profile/techcard"




export default function IndexPage() {


  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 place-content-center">

      <div className="md:w-fit">
        <div className="md:flex justify-center gap-8">
          <div className="flex justify-center">
            <div className="flex-col min-w-[300px]">
              <Image src={profileConfig.profileIcon} alt="Jerry Profile Icon" width={300} height={300} className="object-cover rounded-sm" />
              <div className="p-2">
                <Vccard items={profileConfig.profileExtendUrls} />
              </div>
            </div>
          </div>
          <div className="w-full mt-4 md:mt-0 lg:max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Hi, I'm Jerry.
            </h1>
            <p>I am a passionate IT professional with a strong background in web development and a focus on problem-solving through programming. I hold an MSc in Information Technology from PolyU, a BSc in Computer Science from CityU, and a Higher Diploma in Software Engineering from IVE.</p>
            <p>My interest in System Design and Cloud Solution has led me to become certified in both Azure and AWS, with a current goal of attaining AWS Solution Architecture certification. I have experience building applications using the 3-tier architecture and have even developed some applications using serverless architecture.</p>
            <p>In the past, I have participated in various competitions such as Hackathons, CTF, and so on. Although I didn't win many of them, I gained a lot of experience in areas such as generating ideas, technical skills, teamwork, and more.</p>

            {profileConfig.todos && (profileConfig.todos.length > 0) ?
              <div className="mt-8">
                <TodoCard todolist={profileConfig.todos} />
              </div>
              : <></>
            }
          </div>
        </div>
        {profileConfig.projects && profileConfig.projects.length > 0 ?
          <div className="w-full mt-6">
            <h5 className="text-xl font-bold">Projects</h5>
            <div className="mt-4">
              <OverviewProjects projectKeys={profileConfig.projects} />
            </div>
          </div>
          : <></>
        }

        {profileConfig.blogs && profileConfig.blogs.length > 0 ?
          <div className="w-full mt-6">
            <h5 className="text-xl font-bold">Blogs</h5>
            <div className="mt-4">
              <OverviewBlogs blogKeys={profileConfig.blogs} />
            </div>
          </div>
          : <></>

        }


        {profileConfig.techs && Object.keys(profileConfig.techs).length > 0 ?
          <React.Fragment>
            <Separator className="my-4" />

            <div className="my-8">
              <h4 className="text-xl font-bold text-center ">Tech Stack</h4>

              {Object.keys(profileConfig.techs).map((key: string) => {

                const techs = profileConfig.techs[key];

                return (
                  <div className="mt-8 mb-2">
                    <h6 className=" font-semibold">{key.toLocaleUpperCase()}</h6>
                    <div className="my-4">
                      <TechsCard techs={techs} />
                    </div>
                  </div>
                )

              })

              }

            </div>
          </React.Fragment>
          : <></>


        }


      </div>

    </section>
  )
}
