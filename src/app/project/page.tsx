import React, { use, useState } from "react"
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk"
import { Command, Terminal, X } from "lucide-react"

import { getMDFilesMetadata } from "@/lib/get/Get"
import { getProject, getProjectsMetadata } from "@/lib/get/project/getProject"
import { Project, ProjectMetadata } from "@/lib/typing/Project"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { OverviewProjects } from "@/components/project/projectcard"
import { MessageBox } from "@/components/utils/messagebox"

const ProjectPage = () => {
  const projects = getProjectsMetadata()
  const allProjectKeys = projects.map((project) => project.uri)
  // const [closeAnnoun, setCloseAnnoun] = useState<boolean>(false);

  return (
    <React.Fragment>
      <MessageBox
        icon={<Terminal className="h-6 w-6" />}
        title="My Projects"
        description=" Some code of project may not be good due to the time limited, even contains some security problems."
      />

      <div className="flex place-content-center place-items-center ">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <OverviewProjects projectKeys={allProjectKeys} showFullDesc={true} />
        </div>
      </div>

      <div className="w-full"></div>
    </React.Fragment>
  )
}

export default ProjectPage
