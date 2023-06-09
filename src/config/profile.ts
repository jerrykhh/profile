export const profileConfig: {

    profileIcon: string,
    profileExtendUrls: {
        [key:string] : {
            title: string,
            url: string
        }
    },
    todos: Array<string>,
    projects: Array<string> // keys
    blogs: Array<string> // keys
    techs: {
        [key:string] : string[]
    }
} = {

    profileIcon: "/profile/icon.jpg",

    profileExtendUrls: {
        github: {
            title: "jerrykhh",
            url: "https://github.com/jerrykhh"
        },
        linkedin: {
            title: "jerrykhh",
            url: "https://linkedin.com/in/jerrykhh"
        },
        email: {
            title: "jerrykwok.khh@gmail.com",
            url: "mailto:jerrykwok.khh@gmail.com"
        }
    },

    todos: [
        "AWS Certification (AWS SAA & AWS Developer)",
        "Learn Japanese",
        "Develop Microservices side project (open-test)",
        "Keep learning, keep looking further"
    ],

    projects: [
        "ig-follower",
        "Goodstify"
    ],

    blogs: [ 
        "lcsd"
    ],

    techs: {
        application: [
            "Python",
            "Java",
            "TypeScript",
            "JavaScript",
            "NodeJs",
            "Android",
            "Nextjs",
            "ReactNative",
            "PHP",
            "MySQL"
        ],
        others: [
            "Github",
            "GraphQL",
            "Flask",
            "TailwindCSS",
            "AWS",
            "AWS-CDK"
        ]
    }
}