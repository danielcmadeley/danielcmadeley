import GitHubCalendar from "react-github-calendar";
import Code from "./_components/Code";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-6 bg-zinc-800 p-6 rounded-xl">
        <h1 className="text-start w-full text-xl font-bold">
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
