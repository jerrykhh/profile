import { Link } from '@remix-run/react';

import { Card, ContentCardType } from '@/components/Card';
import { Blog } from '@/types/blog';

type BlogsParams = {
  items: Blog[];
};

export const Blogs = ({ items }: BlogsParams) => {
  return (
    <Card title="Blogs" type={ContentCardType.CONTAINER}>
      <div className="flex flex-col gap-20 py-6">
        {items.map((item, i) => {
          return (
            <div key={i} className="cursor-pointer group">
              <Link
                {...(item.external
                  ? {
                      to: item.externalUrl,
                      target: '_blank',
                    }
                  : {
                      to: `blog/${item.id}`,
                    })}
              >
                <Card
                  key={i}
                  type={ContentCardType.CONTENT}
                  title={item.title}
                  publishedDate={new Date(item.createdAt.start)}
                  tags={item.tags}
                >
                  <p>{item.synopsis}</p>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
