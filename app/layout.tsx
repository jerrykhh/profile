import Nav from '../components/nav'
import '../styles/globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head></head>
            <body>
                <div className='bg-black text-white md:grid md:grid-cols-12 min-h-screen'>
                    <div className="max-h-screen">
                        <div className='md:col-start-1 md:col-end-1 md:top-[25%] md:fixed md:left-[2%]'>
                            <Nav />
                        </div>
                    </div>

                    <div className='w-full md:col-start-2 md:col-end-12 px-4 py-16'>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}