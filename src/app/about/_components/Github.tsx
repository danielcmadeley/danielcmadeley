import React from "react";
import GitHubCalendar from "react-github-calendar";
import Code from "./Code";

const Github = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-zinc-900 p-6 rounded-xl">
      <h1 className="text-start w-full text-xl font-bold uppercase font-display">
        👨‍💻 Shipping code daily.
      </h1>
      <Code code="git add ." />
      <Code code='git commit -m "add"' />
      <Code code="git push" />
      <GitHubCalendar username="mxdeley" />
    </div>
  );
};

export default Github;
