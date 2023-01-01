export interface Metadata {
    uri: string,
    title: string,
    description: string,
    date: string
}

export interface Data {
    metadata: Metadata,
    content: string
}