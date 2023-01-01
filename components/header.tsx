import React from 'react'

type HeaderProps = {
    title: string
}

function Header({title}: HeaderProps) {
    return (
        <React.Fragment>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
        </React.Fragment>
    )
}

export default Header