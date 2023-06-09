import fs from "fs"
import matter from "gray-matter"

import { Data, Metadata } from "../typing/interface"

const getMatter = (filePath: string): matter.GrayMatterFile<string> => {
  return matter(fs.readFileSync(`src/resources/${filePath}`, "utf-8"))
}

const getMDFilesMetadata = <T extends Metadata>(
  folder: string,
  fn: <T>(file: matter.GrayMatterFile<string>) => T
): T[] => {
  const files = fs
    .readdirSync(`src/resources/${folder}`)
    .filter((file) => file.endsWith(".md"))
  const decodedFiles: T[] = files.map((fileName) => {
    return fn(getMatter(`${folder}/${fileName}`))
  })

  return decodedFiles.sort((pre, next) => {
    return pre.date > next.date ? -1 : next.date > pre.date ? 1 : 0
  }) as T[]
}

const getMDFile = <T extends Data>(
  filePath: string,
  fn: <T extends Metadata>(file: matter.GrayMatterFile<string>) => T
): T => {
  const file = getMatter(`${filePath}`)
  return {
    metadata: fn(file),
    content: file.content,
  } as T
}

export { getMatter, getMDFilesMetadata, getMDFile }
