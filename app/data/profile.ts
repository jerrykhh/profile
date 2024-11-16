import { IProfile } from '@/types/profile';

export const profile: IProfile = {
  name: 'Jerry Kwok',
  image: '/static/images/profile/icon.png',
  welcomeHeading: 'Hello, I am Jerry Kwok',
  description:
    "I am a passionate IT professional with a strong background in web development and a focus on problem-solving through programming. I hold an MSc in Information Technology from PolyU, a BSc in Computer Science from CityU, and a Higher Diploma in Software Engineering from IVE.\n My interest in System Design and Cloud Solution has led me to become certified in both Azure and AWS, with a current goal of attaining AWS Solution Architecture certification. I have experience building applications using the 3-tier architecture and have even developed some applications using serverless architecture.\n In the past, I have participated in various competitions such as Hackathons, CTF, and so on. Although I didn't win many of them, I gained a lot of experience in areas such as generating ideas, technical skills, teamwork, and more.",
  todo: {
    title: 'Pined todo list',
    description: 'I need to do it.',
    items: [
      {
        description: 'AWS Certification (AWS SAA & AWS Developer)',
        completed: false,
      },
      {
        description: 'Learn Japanese',
        completed: false,
      },
      {
        description: 'Learn Rust',
        completed: false,
      },
      {
        description: 'Keep learning, keep looking further',
        completed: false,
      },
    ],
  },
  social: [
    {
      key: 'github',
      username: 'jerrykhh',
      url: 'https://github.com/jerrykhh',
    },
    {
      key: 'linkedin',
      username: 'jerrykhh',
      url: 'https://www.linkedin.com/in/jerrykhh/',
    },
    {
      key: 'email',
      username: 'jerrykwok.khh@gmail.com',
      url: 'mailto:jerrykwok.khh@gmail.com',
    },
  ],
  techs: {
    Application: [
      'TypeScript',
      'JavaScript',
      'NodeJs',
      'Nextjs',
      'serverless',
      'React',
      'TailwindCSS',
      'MongoDB',
      'MySQL',
      'Python',
      'Java',
      'Flask',
      'PHP',
      'React Native',
      'Android',
    ],
    DevOps: ['AWS', 'Terraform', 'Github', 'docker', 'AWS-CDK'],
  },
};
