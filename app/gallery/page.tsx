import Image from 'next/image'
import React from 'react'

import r1 from '../../public/gallery/r1.jpg'
import c1 from '../../public/gallery/c1.jpg'
import c4 from '../../public/gallery/c4.jpg'
import r3 from '../../public/gallery/r3.jpg'
import r2 from '../../public/gallery/r2.jpg'
import c2 from '../../public/gallery/c2.jpg'

function Gallery() {
  return (
    <React.Fragment>
      <div className="page-title-box">
        <div className="content">
          <h2>Gallery</h2>
          <span className="subtitle">Photography Is My Hobby</span>
        </div>
      </div>

      <div className="grid grid-col-1 xl:grid-col-3 xl:grid-flow-col xl:min-h-[80vh] content-center gap-4 gallery mt-4">

        <div>
          <Image src={r1} alt='Jerry Photo 1'/>
          <Image src={c1} alt='Jerry Photo 2'/>
        </div>
        <div>
          <Image src={c4} alt='Jerry Photo 3'/>
          <Image src={r3} alt='Jerry Photo 4'/>
        </div>
        <div>
          <Image src={r2} alt='Jerry Photo 5'/>
          <Image src={c2} alt='Jerry Photo 6'/>
        </div>


      </div>
    </React.Fragment>
  )
}

export default Gallery