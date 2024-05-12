import GitHubCalendar from "react-github-calendar";
import Code from "./_components/Code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-center gap-6 bg-zinc-900 p-6 rounded-xl">
        <div className="flex flex-col gap-2 w-full">
          <h2 className=" text-xl uppercase font-display">
            Hi, I&apos;m Daniel Madeley
          </h2>
          <h3 className="text-start w-full font-bold uppercase font-display text-xs text-zinc-400">
            Assistant Structural Engineer
          </h3>
        </div>

        <p className="text-sm">
          I&apos;m a structural engineer who loves to build things and ship on
          the side. I am currently working in South-Wales as an Assistant
          Structural Engineer and Freelance Web Developer.
        </p>
        <p className="text-sm">
          My goal is to merge both my skillsets and become a computational
          designer.
        </p>
        <Button
          variant="default"
          className="w-fit bg-zinc-950 hover:bg-zinc-950/70"
        >
          <Link href="/contact">Contact me</Link>
        </Button>
      </div>
      <div className="flex flex-col items-start justify-center gap-6 bg-zinc-900 p-6 rounded-xl">
        <h2 className="text-xl uppercase font-display">
          Structural Engineering Workflow
        </h2>
      </div>

      <div className="flex flex-col items-start justify-center gap-6 bg-zinc-900 p-6 rounded-xl">
        <h2 className=" text-xl uppercase font-display">
          Favourite Tech Stack
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="uppercase font-display">Frontend</h3>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Frameworks
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>React</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/next-js.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Next.js</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              UI / UX
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>TailwindCSS</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/next-js.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Shadcn</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/next-js.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Magic UI</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/next-js.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Aceternity</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Build Tools
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />
                <p>Vite</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Async State Management
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />
                <p>TanStack Query</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Routing
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />
                <p>TanStack Router</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Schema Validation
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />
                <p>Zod</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="uppercase font-display">Backend</h3>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              API
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Hono</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              BaaS
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Convex</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              ORM
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Drizzle</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Emails
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Loops</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Resend</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>React Email</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Auth
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Clerk</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Payments
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Stripe</p>
              </div>
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Lemon Squeezy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="uppercase font-display">Deployment</h3>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Platform
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Vercel</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-display text-zinc-400">
              Security
            </h4>
            <div className="flex flex-row gap-4 text-sm">
              <div className="flex flex-row gap-2">
                <Image
                  src="/react.svg"
                  alt="React"
                  width={16}
                  height={16}
                  className="rounded-md"
                />

                <p>Cloudflare</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 bg-zinc-900 p-6 rounded-xl">
        <h1 className="text-start w-full text-xl font-bold uppercase font-display">
          👨‍💻 Shipping code daily.
        </h1>
        <Code code="git add ." />
        <Code code='git commit -m "add"' />
        <Code code="git push" />
        <GitHubCalendar username="mxdeley" />
      </div>
    </div>
  );
};

export default About;
