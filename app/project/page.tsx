import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getProjectsMetadata } from '../../lib/get/project/getProject'

function Project() {

  const projects = getProjectsMetadata();

  return (

    <React.Fragment>
      <div className="page-title-box">
        <div className="content">
          <h2>My Project</h2>
          <span className="subtitle">Latest Programming Project</span>
        </div>
      </div>

      <div className="row">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 project gap-4">

          {
            projects.map((project, i) => {

              return (
                <Link href={`/project/${project.uri}`} key={i} className='project-card'>
                  <Image src={project.icon} className='w-full' width={300} height={300} alt='' />
                  <div className='content h-full'>
                    <h4>{project.title}</h4>
                    <p className='subtitle'>{project.description}</p>
                    <div className='mt-3'>
                      {project.language}
                    </div>
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

export default Project