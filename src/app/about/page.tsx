import GitHubCalendar from "react-github-calendar";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl ">git add -A</h2>
        <h2 className="text-2xl ">git commit -m &quot;add&quot;</h2>
        <h2 className="text-2xl ">git push</h2>
        <GitHubCalendar username="mxdeley" />
      </div>
    </div>
  );
};

export default About;
