import RadialGradient from "@/components/ui/radial-gradient";
import Github from "./_components/Github";
import Introduction from "./_components/Introduction";
import StructuralWorkflow from "./_components/StructuralWorkflow";
import TechStack from "./_components/TechStack";

const About = () => {
  return (
    <div className="flex flex-col gap-6">
      <Introduction />
      <StructuralWorkflow />
      <TechStack />
      <Github />
      <RadialGradient origin="left" />
      <RadialGradient origin="top right" />
      <RadialGradient origin="bottom right" />
    </div>
  );
};

export default About;
