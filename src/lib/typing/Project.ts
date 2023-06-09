import { Blog, BlogMetadata } from "./Blog"

export interface ProjectMetadata extends BlogMetadata {
    name: string,
    tag: string,
    repository: string,
    language: JSX.Element
}

export type Project = Blog & {
    metadata: ProjectMetadata,
}


