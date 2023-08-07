import Image from "next/image"
import Link from "next/link"

import { extUrls } from "@/config/ext-urls"
import TypeWriter from "@/components/ui/typewriter"

const ExtLinkPage = () => {
  return (
    <div className="items-center justify-center">
      <div className="w-96 2xl:w-[30rem]">
        <h1 className="font-blod my-4 text-center text-xl">
          {"LinkTr".toLocaleUpperCase()}
        </h1>

        <div className="">
          <Image
            src={extUrls.icon}
            alt="Jerry Icon (Generative AI Gen)"
            width={500}
            height={500}
            className="rounded-md object-cover"
          />
        </div>

        <div className="mb-5 mt-1 text-center">
          <div className="my-8 min-h-[68px] rounded bg-gray-100 p-4 text-xs dark:bg-gray-800">
            <div className="mb-1">Prompt:</div>
            <TypeWriter text={extUrls.typing} loop={true} />
          </div>

          <div className="text-xl font-light">{extUrls.intro}</div>
        </div>

        {extUrls.links ? (
          <div className="flex flex-col items-center space-y-6">
            {Object.keys(extUrls.links).map((key: string, i: number) => {
              let hrefUrl: string = extUrls.links[key]
              if (key.toLowerCase() === "email") hrefUrl = `mailto:${hrefUrl}`

              return (
                <div>
                  <Link
                    key={i}
                    href={hrefUrl}
                    target={hrefUrl !== "./" ? "_blank" : "_self"}
                  >
                    <div className="w-72 border border-black bg-transparent p-4 text-center text-sm hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
                      {key.toLocaleUpperCase()}
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ExtLinkPage
