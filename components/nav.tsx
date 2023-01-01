"use client"
import Link from 'next/link';
import React, { useState } from 'react'

function Nav() {

    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (
        <React.Fragment>
            <div className='px-4 py-6 text-right md:hidden'>
                <div className="relative inline-block text-left">

                    <button type="button" className="justify-center rounded-md border border-gray-300 bg-white p-2  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" onClick={(e) => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>

                    <div className={(!isOpen) ? 'hidden' : 'absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                        <div className="py-1" role="none">
                            <Link href="/" className='nav-item'>About Me</Link>
                            <Link href="/project" className='nav-item'>Projects</Link>
                            <Link href="/blog" className='nav-item'>Blog</Link>
                            <Link href="/gallery" className='nav-item'>Gallery</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='hidden md:nav-menu'>
                <ul>
                    <Link href="/">
                        <li>About Me</li>
                    </Link>
                    <Link href="/project">
                        <li>Projects</li>
                    </Link>
                    <Link href="/blog">
                        <li>Blog</li>
                    </Link>
                    <Link href="/gallery">
                        <li>Gallery</li>
                    </Link>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Nav