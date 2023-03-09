import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import convertGitHubLangColor from '../lib/convert/repo-lang'

import picProfile from '../public/profile/avatar.png'
import picHA from '../public/profile/ha.jpg'
import picPickTech from '../public/profile/pick-tech.png'
import picPolyU from '../public/profile/polyu.jpg'
import picCityU from '../public/profile/cityu.jpg'
import picIVE from '../public/profile/ive.jpg'
import picPY from '../public/tech/python.png'
import picJava from '../public/tech/java.png'
import picAndroid from '../public/tech/android.png'
import picTS from '../public/tech/typescript.jpg'
import picJS from '../public/tech/javascript.jpg'
import picNodeJs from '../public/tech/node_js.png'
import picReact from '../public/tech/react.png'
import picNextJs from '../public/tech/nextjs.png'
import picRN from '../public/tech/react_native.jpg'
import picPHP from '../public/tech/php.jpg'
import picMySQL from '../public/tech/mysql.png'
import picGit from '../public/tech/github.jpg'
import picGq from '../public/tech/graphQL.png'
import picFlask from '../public/tech/flask.png'
import picTailwind from '../public/tech/tailwindcss.png'
import picAWS from '../public/tech/aws.jpg'
import picAWSCDK from '../public/tech/aws_cdk.png'



function Home() {

  return (
    <React.Fragment>
      <div className="page-title-box">
        <div className="content">
          <h2>About me</h2>
          <span className="subtitle">Main informations about me </span>
        </div>
      </div>

      <div className='row'>
        <div className="md:flex md:gap-x-4">
          <div className='shrink-0'>
            <Image src={picProfile} alt='Jerry Acatar Icon Image' className='img-center md:w-auto md:m-0' width={500} height={500} />
            <div className="flex my-5 gap-2 profile-link">
              <a href="https://www.github.com/jerrykhh" target='_blank' rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href='https://www.linkedin.com/in/jerrykhh/' target='_blank' rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512">
                  <path
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  ></path>
                </svg>
              </a>

            </div>
          </div>
          <div className='pt-3 md:grow md:pt-0'>
            <h2>Hello, I am Jerry from Hong Kong</h2>
            <p>
              My name is Jerry. I am High diploma and Degree graduated in Software Engineering
              and computer science. Now I am studying the Master in Information Technology.</p>

            <p className="subtitle">
              I am interesting the cloud solution. As a result, I am Certificated in Azure and
              AWS. Now, I am planning to get the AWS Solution architecture certificated. I has some building application experience in the 3-tier architecture as well as builded the serverless architecture in CityU Hackathon this awarded second runner up.

            </p>
            <p className="subtitle">I love the problem solving using the programming so I often build
              the personal project with different Programming language and library such as
              python, nodeJS and so on. In my current personal project, i started the small
              business store in instagram. I first faceing the problem is promoting So I
              develop the program to get other instagram account follower or following
              information to the CSV file and the program will follow the user automatically
              based on CSV file. There is not the web crawler, it is get the data in
              the instagram backend server directly. Also, if you interesting it, the source
              code is public in my GitHub.
            </p>

            <div className="row">
              <div className="grid grid-cols-2">
                <div className="about-col">
                  <h4>Name:</h4>
                  <span>Kwok Ho Hin, Jerry</span>
                </div>
                <div className="about-col">
                  <h4>Country:</h4>
                  <span>Hong Kong</span>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-4">

                <div className="about-col">
                  <h4>Work Status:</h4>
                  <span>Open to Work</span>
                </div>
                <div className="about-col">
                  <h4>Freelancer:</h4>
                  <span>Available</span>
                </div>
              </div>
              <div className=" mt-4">
                <div className="about-col">
                  <h4>Email:</h4>
                  <span>jerry.mail.proxy@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex md:gap-x-12">
        <div className='md:w-1/2 profile-exp '>
          <h2>My Expericence</h2>
          <div className="row px-1">
            <div className='flex gap-x-3'>
              <div className="shrink-0 py-2">
                <Image src={picHA} width={64} height={64} alt='Hospital Authority' />
              </div>
              <div className="grow">
                <h4>Placement Student Programmer</h4>
                <span>Hospital Authority · Internship</span>
                <div className="date"><i>Jul 2021 - Jun 2022 · 1 yr</i></div>
                <p className="subtitle">Revamp SQL Server Agent jobs(PowerShell) to Bash Script
                  due to MSSQL DB migrating to MySQL DB,
                  Revamp ASP .net Webpage to Python Flask and deploy to OpenShift,
                  Develop and maintain static web pages,
                  Develop and maintain the Shell Script or Python Program based on the
                  user requirements such as the reporting, WebCrawler, RESTful API
                  Gateway, etc.</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className='flex gap-x-3'>
              <div className="shrink-0 py-2">
                <Image src={picPickTech} width={64} height={64} alt='Pick Technology Ltd' />
              </div>
              <div className="grow">
                <h4>Web Programmer</h4>
                <span>Pick Technology Ltd · Summer Intern</span>
                <div className="date"><i>Jul 2019 - Aug 2019</i></div>
                <p className="subtitle">Develop Static Website, work with a small team and
                  fulilling the user requirements</p>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-1/2 profile-exp '>
          <h2>My Education</h2>
          <div className="row px-1">
            <div className='flex gap-x-3'>
              <div className="shrink-0 py-2">
                <Image src={picPolyU} width={64} height={64} alt='The Hong Kong Polytechnic University' />
              </div>
              <div className="grow">
                <h4>The Hong Kong Polytechnic University</h4>
                <span>Msc in Information Technology</span>
                <div className="date"><i>Aug 2022 - Present</i></div>
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className='flex gap-x-3'>
              <div className="shrink-0 py-2">
                <Image src={picCityU} width={64} height={64} alt='City University of Hong Kong' />
              </div>
              <div className="grow">
                <h4>City University of Hong Kong</h4>
                <span>BSc Computer Science</span>
                <div className="date">Sep 2020 - Jun 2022</div>
                <p className="subtitle">Activities and societies: <br />
                  HK tech 300,
                  CityHack 2022,
                  HKCERT CTF 2021,
                  UST hackathon 2021</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className='flex gap-x-3'>
              <div className="shrink-0 py-2">
                <Image src={picIVE} width={64} height={64} alt='Institution of Vocational Education' />
              </div>
              <div className="grow">
                <h4>Institution of Vocational Education</h4>
                <span>Higher Diploma in Software Engineering</span>
                <div className="date">Sep 2018 - Jun 2020</div>
                <p className="subtitle">Activities and societies: <br />
                  AWS Summit Online Hong Kong,
                  AWSome Day,
                  Google Hong Kong Office Visit,
                  Exchange Program of Greater Bay Area,
                  Exchange Program of Sichuan,
                  Industrial Visit to Mainland China Companies (YEUNG Kin-man
                  industrial training scheme)Activities and societies: AWS Summit
                  Online Hong Kong, AWSome Day, Google Hong Kong Office Visit,
                  Exchange Program of Greater Bay Area, Exchange Program of Sichuan,
                  Industrial Visit to Mainland China Companies (YEUNG Kin-man
                  industrial training scheme)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h4>Tech Stack</h4>
        <h6 className='mt-4'>Application</h6>

        <div className="flex flex-wrap gap-x-4">
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picPY} alt='Python' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Python</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picJava} alt='Java' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Java</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picAndroid} alt='Android' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Android</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picTS} alt='Typescript' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">TypeScript</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picJS} alt='JavaScript' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">JavaScript</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picNodeJs} alt='Node.js' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Node.js</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picReact} alt='React' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">React</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picNextJs} alt='Next.js' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Next.js</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picRN} alt='React Native' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">React Native</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picPHP} alt='Php' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">PHP</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picMySQL} alt='MySQL' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">MySQL</p>
          </div>
        </div>

        <h6 className="mt-4">Utilies / Services</h6>
        <div className="flex flex-wrap gap-x-4">
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picGit} alt='Github' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">GitHub</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picGq} alt='GraphQL' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">GraphQL</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picFlask} alt='Flask' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Flask</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picTailwind} alt='Tailwind CSS' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">Tailwind CSS</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picAWS} alt='AWS' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">AWS</p>
          </div>
          <div className="tech-card">
            <div className="tech-card-content">
              <Image src={picAWSCDK} alt='AWS CDK' width={75} height={75} />
            </div>
            <p className="mt-2 text-center">AWS CDK</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="profile-project">
          <div className="page-title-box mb-4">
            <div className="content">
              <h2>Projects</h2>
            </div>
          </div>

          <div className="my-2">
            <Link href='/project/ig-follower'>
              <div className="profile-project-card">
                <h4>Instagram Follower/Following save to CSV file and Auto Follow Based on CSV
                  File</h4>
                <span className="subtitle">It can save the following or follower data based on you is
                  provided Instagram account username (the account must be followed/public
                  account). In addition, the program is able to remove duplicate row or show
                  duplicate only and save to new data file. Moreover, the program can follow
                  the
                  user automatically based on the data file, it will send the follow request
                  to
                  instagram server and for each request can set the customized time interval.
                  User
                  can utilize above method to follow the potential customer for your instagram
                  business promotion/ data analysis. <br />* Now Updated version handled is
                  supported
                  the two factor authentication and login challenge (email)</span>
                {convertGitHubLangColor('Python')}
              </div>
            </Link>
          </div>

          <div className="mt-6 mb-2">
            <Link href='/project/grading-accelerator'>
              <div className="profile-project-card">
                <h4>Grading Accelerator</h4>
                <span className="subtitle">There will be many writing tasks in different subjects, such
                  as
                  examinations, quizzes, homework, etc. Many times these tasks will have a
                  correct
                  answer for students to follow. If there are more than 200 students in the
                  course, the teacher will need much time and at least 200 times to view the
                  test
                  papers of different students, which the answers of students may contain the
                  same
                  answers. This is very time-consuming and also makes the teachers workload
                  heavy. Therefore, a platform is needed to help teachers reduce grading time
                  and
                  answer students’ answers. Carry out different data analyses to make it more
                  straightforward that students perform poorly on that part of the topic to
                  achieve higher teaching goals.</span>
                {convertGitHubLangColor('TypeScript')}
              </div>
            </Link>

          </div>




        </div>

      </div>
    </React.Fragment>
  )
}

export default Home