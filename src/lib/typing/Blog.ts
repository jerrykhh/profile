import { Data, Metadata } from "./interface"

export interface BlogMetadata extends Metadata {
  icon: string
  uri: string
  title: string
  description: string
}

export type Blog = Data & {
  metadata: BlogMetadata
}
