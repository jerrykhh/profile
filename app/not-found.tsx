import Link from 'next/link'
import React from 'react'

function NotFound() {
    return (
        <section className="flex items-center h-full p-16 bg-gray-900 text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl my-8">Sorry, we couldnt find this page.</p>
                    <Link rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded bg-rebeccapurple hover:bg-purple-700 text-white">Back to My Profile Page</Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound