import matter from "gray-matter"

import convertGitHubLangColor from "../../convert/repo-lang"
import { Project, ProjectMetadata } from "../../typing/Project"
import { getMDFile, getMDFilesMetadata } from "../Get"

const _convertmatter2MetaData = <ProjectMetadata>(
  matterData: matter.GrayMatterFile<string>
): ProjectMetadata => {
  const metadata = { ...matterData.data }
  metadata.icon = `/project/${matterData.data.uri}/${matterData.data.icon}`
  // metadata.language = convertGitHubLangColor(matterData.data.language)
  return metadata as ProjectMetadata
}

const getProjectsMetadata = (): ProjectMetadata[] => {
  return getMDFilesMetadata("projects", _convertmatter2MetaData)
}

const getProject = (title: string): Project => {
  return getMDFile(`projects/${title}.md`, _convertmatter2MetaData)
}

export { getProjectsMetadata, getProject }
