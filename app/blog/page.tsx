
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { getBlogsMetadata } from '../../lib/get/blog/getBlog'

function Blog() {
  
  const posts = getBlogsMetadata();

  return (
    <React.Fragment>
      <div className="page-title-box">
        <div className="content">
          <h2>My Blog</h2>
          <span className="subtitle">Latest Posts related Programming, Computer, etc</span>
        </div>
      </div>
      <div className="row">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 project gap-4">
          {posts.map((post, i) => {

            return (
              <Link href={`/blog/${post.uri}`} key={i} className='blog-card ' >
                <Image src={post.icon} className='w-full' width={320} height={180} alt={`${post.title} cover`} />
                <div className="content m-4 z-10 bg-zinc-800 -mt-12">
                  <h4>{post.title}</h4>
                  <p className='subtitle'>{post.description}</p>
                </div>
              </Link>
            )
          })

          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default Blog