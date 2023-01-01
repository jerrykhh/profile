import matter from 'gray-matter';
import { Blog, BlogMetadata } from '../../typing/Blog';
import { getMDFile, getMDFilesMetadata } from '../Get';


const _convertmatter2MetaData = <BlogMetadata>(matterData: matter.GrayMatterFile<string>): BlogMetadata => {
    const metadata = { ...matterData.data }
    metadata.icon = `/blog/${matterData.data.uri}/${matterData.data.icon}`
    return metadata as BlogMetadata;
}

const getBlogsMetadata = (): BlogMetadata[] => {
    return getMDFilesMetadata('posts', _convertmatter2MetaData)
}

const getBlog = (title: string): Blog => {
    return getMDFile(`posts/${title}.md`, _convertmatter2MetaData)
}

export { getBlogsMetadata, getBlog }