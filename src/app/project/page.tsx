import { MessageBox } from "@/components/utils/messagebox";
import { OverviewProjects } from "@/components/project/projectcard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getMDFilesMetadata } from "@/lib/get/Get";
import { getProject, getProjectsMetadata } from "@/lib/get/project/getProject";
import { Project, ProjectMetadata } from "@/lib/typing/Project";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "cmdk";
import { Command, Terminal, X } from "lucide-react";
import React, { use, useState } from "react";


const ProjectPage = () => {

    const projects = getProjectsMetadata();
    const allProjectKeys = projects.map(project => project.uri);
    // const [closeAnnoun, setCloseAnnoun] = useState<boolean>(false);

    return (
        <React.Fragment>
            <div className="flex">
                
                <div>
                    <MessageBox
                        icon={<Terminal className="w-6 h-6" />}
                        title="My Projects"
                        description=" Some code of project may not be good due to the time limited, even contains some security problems." />


                    <div className="h-[80vh] flex place-items-center">
                        <div className="grid grid-cols-4 gap-5">
                            <OverviewProjects
                                projectKeys={allProjectKeys}
                                showFullDesc={true} />

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProjectPage;