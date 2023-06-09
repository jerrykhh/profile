import githubLangColors from './github-lang-colors.json'

const convertGitHubLangColor = (lang: string): JSX.Element => {

    const colorColor = githubLangColors[lang as keyof typeof githubLangColors]
    return (
        <div className="repo-language">
            <span className="repo-language-color" style={{backgroundColor: colorColor}}></span>
            {lang}
        </div>
    )
}

export default convertGitHubLangColor;