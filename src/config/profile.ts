export const profileConfig: {
  profileIcon: string
  nickname: string
  intro: string[], // <p>intro[i]</p>
  profileExtendUrls: {
    [key: string]: {
      title: string
      url: string
    }
  }
  todos: Array<string>
  projects: Array<string> // keys
  blogs: Array<string> // keys
  techs: {
    [key: string]: string[]
  }
} = {
  profileIcon: "/profile/icon.jpg",
  nickname: "Jerry",
  intro: [
    "I am a passionate IT professional with a strong background in web development and a focus on problem-solving through programming. I hold an MSc in Information Technology from PolyU, a BSc in Computer Science from CityU, and a Higher Diploma in Software Engineering from IVE. ",
    "My interest in System Design and Cloud Solution has led me to become certified in both Azure and AWS, with a current goal of attaining AWS Solution Architecture certification. I have experience building applications using the 3-tier architecture and have even developed some applications using serverless architecture. ",
    " In the past, I have participated in various competitions such as Hackathons, CTF, and so on. Although I didn't win many of them, I gained a lot of experience in areas such as generating ideas, technical skills, teamwork, and more."
  ],
  profileExtendUrls: {
    github: {
      title: "jerrykhh",
      url: "https://github.com/jerrykhh",
    },
    linkedin: {
      title: "jerrykhh",
      url: "https://linkedin.com/in/jerrykhh",
    },
    email: {
      title: "jerrykwok.khh@gmail.com",
      url: "mailto:jerrykwok.khh@gmail.com",
    },
  },

  todos: [
    "AWS Certification (AWS SAA & AWS Developer)",
    "Learn Japanese",
    "Develop Microservices side project (open-test)",
    "Keep learning, keep looking further",
  ],

  projects: ["ig-follower", "Goodstify", "grading-accelerator", "USTHack21"],

  blogs: [
    "stable-diffusion-lora-training",
    "lcsd",
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
      "MySQL",
    ],
    others: ["Github", "GraphQL", "Flask", "TailwindCSS", "AWS", "AWS-CDK"],
  },
}
