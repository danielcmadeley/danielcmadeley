import GitHubCalendar from "react-github-calendar";
import Code from "./_components/Code";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <Button
          variant="default"
          className="w-fit bg-zinc-950 hover:bg-zinc-950/70"
        >
          <Link href="/contact">Contact me</Link>
        </Button>
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
