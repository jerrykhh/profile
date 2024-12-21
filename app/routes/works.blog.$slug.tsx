import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { Blog } from '@/models/blog';
import { getBlog } from '@/services/work.service/blog.service';

export const clientLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    return new Response('Not Found', { status: 404 });
  }

  const blog = await getBlog(slug);

  return { blog };
};

export const BlogDetail = () => {
  const { blog }: { blog: Blog } = useLoaderData<typeof clientLoader>();
  console.log('blog', blog);
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h1>{blog.meta.title}</h1>
        <p className="text-sm text-muted-foreground">
          Published on {blog.meta.createdAt.toLocaleDateString()}
        </p>
        <div>
          <img
            src={blog.meta.image}
            alt={blog.meta.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <article className="prose-md prose  self-center dark:text-gray-200 lg:mt-0">
        <Markdown rehypePlugins={[rehypeRaw]}>{blog.content}</Markdown>
      </article>
    </div>
  );
};

export default BlogDetail;
