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
    </div>
  );
};

export default About;
