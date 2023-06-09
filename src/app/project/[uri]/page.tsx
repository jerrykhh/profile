import { getProjectsMetadata } from "@/lib/get/project/getProject";

type ProjectPageProps = {
    params: {
        uri: string;
    };
}


const ProjectDetailPage = ({ params: { uri } }: ProjectPageProps) => {

    return <>
        <p>test {uri}</p>
        <p>{uri}</p>
    </>
}

export default ProjectDetailPage;

export async function generateStaticParams() {
    const projects = getProjectsMetadata();
    return projects.map(project => ({
        title: project.uri
    }))
}