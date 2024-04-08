import { Separator } from "@/app/components/separator";
import { GithubIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "../components/nav";

export default function CV() {
  return (
    <main className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="flex min-h-screen flex-col items-center max-w-4xl mx-auto p-20 space-y-10 text-zinc-50">
        <div className="flex items-center justify-between w-full">
          <div className="w-2/3 flex flex-col space-y-4">
            <h1 className="font-bold text-xl">Daniel Madeley</h1>
            <div>
              <p className="text-zinc-50">
                Experienced engineer working in tech and construction. Skilled
                in FEA/FEM, automation and full stack web development.
              </p>
            </div>
            <div className="space-y-2 flex flex-col">
              <div className="flex items-center space-x-2 text-zinc-50">
                <MapPinIcon size={16} />
                <h3>Current City: Cardiff</h3>
              </div>
              <div className="flex justify-start w-full space-x-4 mt-4">
                <Link href={"https://read.cv/mxdeley"}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform transition duration-500 hover:scale-125 "
                  >
                    <path
                      fill="#fafafa"
                      d="m211.48 35.32l-130.25-23a20 20 0 0 0-23.18 16.22l-29.75 169a20 20 0 0 0 16.22 23.16l130.25 23a20.1 20.1 0 0 0 3.52.31A20 20 0 0 0 198 227.46l29.75-169a20 20 0 0 0-16.27-23.14M175 219.36L52.63 197.75L81 36.64l122.37 21.61ZM91.9 67a12 12 0 0 1 13.9-9.73L173 69.14A12 12 0 0 1 171 93a12.59 12.59 0 0 1-2.1-.18L101.63 80.9A12 12 0 0 1 91.9 67M85 106.39a12 12 0 0 1 13.91-9.73l67.22 11.88a12 12 0 0 1-2.13 23.81a12.5 12.5 0 0 1-2.1-.18l-67.21-11.88a12 12 0 0 1-9.69-13.9m-7 39.39a12 12 0 0 1 13.9-9.73l33.64 5.95a12 12 0 0 1-2.07 23.82a11.63 11.63 0 0 1-2.1-.19l-33.61-5.93A12 12 0 0 1 78 145.78"
                    />
                  </svg>
                </Link>
                <Link href={"https://twitter.com/mxdeley"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="20"
                    height="20"
                    className="transform transition duration-500 hover:scale-125 "
                  >
                    <path
                      fill="#fafafa"
                      d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
                    />
                  </svg>
                </Link>
                <Link href={"https://bento.me/mxdeley"}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform transition duration-500 hover:scale-125 "
                  >
                    <path
                      fill="#fafafa"
                      d="M0 10.435c0-.256.051-.512.153-.758c.233-.56.854-1.046 2.095-2.018l6.206-4.856c1.241-.972 1.862-1.458 2.577-1.64c.63-.16 1.308-.16 1.938 0c.715.183 1.336.668 2.577 1.64l6.206 4.856c1.241.972 1.862 1.458 2.095 2.018c.102.246.153.502.153.758v3.13c0 .256-.051.512-.153.758c-.233.56-.854 1.046-2.095 2.017l-6.206 4.857c-1.241.972-1.862 1.457-2.577 1.64c-.63.16-1.308.16-1.938 0c-.715-.183-1.336-.668-2.577-1.64L2.248 16.34C1.007 15.37.386 14.883.153 14.323A1.971 1.971 0 0 1 0 13.565zm9.34-3.238l.887.694c.62.485.93.728 1.289.82c.315.08.653.08.968 0c.358-.092.668-.335 1.29-.82l.886-.694c.62-.486.93-.729 1.047-1.009a.975.975 0 0 0 0-.758c-.116-.28-.427-.523-1.047-1.008l-.887-.694c-.62-.486-.93-.729-1.289-.82a1.984 1.984 0 0 0-.968 0c-.358.091-.668.334-1.29.82l-.886.694c-.62.485-.93.728-1.047 1.008a.975.975 0 0 0 0 .758c.116.28.427.523 1.047 1.009m5.91 4.625l.887.694c.62.486.931.729 1.29.82c.314.08.653.08.968 0c.358-.091.668-.334 1.288-.82l.887-.694c.62-.485.931-.728 1.047-1.008a.976.976 0 0 0 0-.758c-.116-.28-.426-.523-1.047-1.009l-.887-.694c-.62-.485-.93-.728-1.288-.82a1.984 1.984 0 0 0-.969 0c-.358.092-.668.335-1.289.82l-.886.694c-.621.486-.931.729-1.047 1.009a.975.975 0 0 0 0 .758c.116.28.426.523 1.047 1.008Zm-11.82 0l6.797 5.32c.62.486.93.728 1.289.82c.315.08.653.08.968 0c.358-.092.668-.334 1.29-.82l.886-.694c.62-.486.93-.729 1.047-1.009a.974.974 0 0 0 0-.758c-.116-.28-.427-.523-1.047-1.008l-6.797-5.32c-.62-.485-.931-.728-1.29-.82a1.984 1.984 0 0 0-.968 0c-.358.092-.668.335-1.288.82l-.887.694c-.62.486-.931.729-1.047 1.009a.975.975 0 0 0 0 .758c.116.28.426.523 1.047 1.008"
                    />
                  </svg>
                </Link>
                <Link href={"https://github.com/mxdeley"}>
                  <GithubIcon
                    size={20}
                    className="transform transition duration-500 hover:scale-125 text-zinc-50"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex justify-end">
            <Image
              src={
                "https://pbs.twimg.com/profile_images/1683098188637519872/IC1Vn69p_400x400.jpg"
              }
              width={200}
              height={200}
              alt="Logo"
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="flex justify-start w-full text-zinc-50">
          <div>
            <h2 className="text-lg font-bold text-zinc-50">About</h2>
            <p className="text-sm">
              With more than four years of experience as a freelance web
              developer, I&apos;ve honed my skills at my own design studio{" "}
              <Link href="#" className="text-zinc-50 font-bold">
                madeleydesignstudio
              </Link>
              . You can find my preferred tech stack{" "}
              <Link href="./cv/web-stack" className="text-zinc-50 font-bold">
                here
              </Link>
              . Additionally, I hold a BEng in civil engineering and have spent
              two years working as a Structural Engineer. I leverage my
              programming capabilities to automate the design process using
              Python scripts. Feel free to check out my preferred libraries{" "}
              <Link href="#" className="text-zinc-50 font-bold">
                here.
              </Link>
            </p>
          </div>
        </div>
        <div className="flex justify-start space-x-10 w-full text-zinc-50">
          <div>
            <h2 className="text-md font-bold text-zinc-50">Skills</h2>
            <div className="grid grid-cols-3 gap-x-4">
              <p className="text-sm">• Structural Design & Analysis</p>
              <p className="text-sm">• Material Science</p>
              <p className="text-sm">• FEA/FEM</p>
              <p className="text-sm">• Automation</p>
              <p className="text-sm">• Web Dev</p>
              <p className="text-sm">• AI</p>
              <p className="text-sm">• Design</p>
              <p className="text-sm">• Marketing</p>
            </div>
          </div>
          <div>
            <h2 className="text-md font-bold text-zinc-50">Hobbies</h2>
            <p className="text-sm">• MMA</p>
            <p className="text-sm">• Football</p>
            <p className="text-sm">• Fishing</p>
          </div>
        </div>
        <Separator />
        <div className="flex justify-start w-full">
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-zinc-50">Work Experience</h2>
            <div>
              <h3 className="font-bold">Austin Partnership</h3>
              <h4 className="text-zinc-50 text-xs">2022-Current</h4>
              <p className="text-zinc-50 text-sm mt-1">
                I design steel, concrete, masonry, timber and aluminium
                structures to the Eurocodes. I am experienced in Tekla Tedds,
                Structural Designer, Portal Frame Designer, StaTiCa, Fisher
                Fixperience and Hilti. I can write traditional hand calculations
                and also utilise pythons scripting capabilities to automate
                design calculations. FEA/FEM modelling with OpenSeesPy and
                Gmesh. Parametric modelling with Rhino, grasshopper and KiWi3d.
              </p>
            </div>

            <div>
              <h3 className="font-bold">madeleydesignstudio (Freelancing)</h3>
              <h4 className="text-zinc-50 text-xs">2021-Current</h4>
              <p className="text-zinc-50 text-sm mt-1">
                I work on a diverse range of web development projects. My
                primary focus has been leveraging the power of Next.js as a
                full-stack framework. I have also dabbled in marketing, design,
                and sales. This multifaceted experience has allowed me to gain
                valuable insights and offer holistic solutions to my clients.
              </p>
            </div>
            <div className="max-w-2xl flex flex-col justify-end space-y-2 ">
              <div className="ml-2">
                <h5 className="text-sm font-semibold"> - Infinitim</h5>
                <h4 className="text-zinc-50 text-xs">2021-2023</h4>
                <p className="text-zinc-50 text-sm mt-1">
                  As a result of my experience with the Fungible Cabin, I was
                  inspired to establish my own digital marketing agency. I took
                  pleasure in crafting marketing websites (Landing Pages) for
                  clients based in Derby. My tenure at Infinitim provided me
                  with an opportunity to expand my expertise in various areas
                  such as digital marketing, web development, sales, and design.
                  Additionally, I gained proficiency in utilizing tools like
                  Figma, Midjourney, and various analytical tools.
                </p>
              </div>
              <div className="ml-2">
                <h5 className="text-sm font-semibold">- The Fungible Cabin</h5>
                <h4 className="text-zinc-50 text-xs">2021-2022</h4>
                <p className="text-zinc-50 text-sm mt-1">
                  During the NFT boom in 2021, two friends and I co-created
                  &apos;The Fungible Cabin&apos;. My role initially involved
                  working as a designer with Adobe Illustrator and Photoshop.
                  Subsequently, I ventured into solidity development, which
                  introduced me to the realm of web development and quickly made
                  me realise I had a lot to learn. This experience marked the
                  beginning of my journey as a web developer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-start w-full">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-bold text-zinc-50">Education</h2>
            <div>
              <h3 className="font-semibold">Leeds Beckett</h3>
              <h4 className="text-zinc-50 text-xs">2019-2022</h4>
              <p className="text-zinc-50 text-sm">
                I achieved a 2:1 in civil engineering.
              </p>
              <h5 className="text-sm underline mt-1">Courses</h5>
              <p className="text-zinc-50 text-sm">Material Science</p>
              <p className="text-zinc-50 text-sm">
                Structural Analysis (Advanced)
              </p>
              <p className="text-zinc-50 text-sm">Fluid Mechanics</p>
              <p className="text-zinc-50 text-sm">
                Engineering Skills -{">"} Python FEA/FEM Automation
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Self-Taught Programmer</h3>
              <h4 className="text-zinc-50 text-xs">2019-Onwards</h4>
              <h5 className="text-sm underline mt-1">Courses</h5>
              <p className="text-zinc-50 text-sm">
                Boot.dev -{">"} Backend Development
              </p>
              <p className="text-zinc-50 text-sm">
                Papareact -{">"} Fullstack Development
              </p>
              <p className="text-zinc-50 text-sm">
                Codeacademy -{">"} Fullstack Development
              </p>
              <p className="text-zinc-50 text-sm">
                Code with Antonio -{">"} Fullstack Development
              </p>
              <p className="text-zinc-50 text-sm">
                Primeagen - Algorithms & Data Structures -{">"} Backend
                Development
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
