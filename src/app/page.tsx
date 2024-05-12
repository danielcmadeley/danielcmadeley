import Link from "next/link";
import Particles from "@/components/Particles";
import Image from "next/image";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Newsletter", href: "https://mxdeley.beehiiv.com/subscribe" },
];

export default function Home() {
  return (
    <>
      <Image
        src="/hero-bg.png"
        alt="Hero background"
        className="fixed inset-0 -z-10 animate-fade-in"
        fill
        style={{ objectFit: "cover" }}
      />
      <nav className="my-16 animate-fade-in fixed top-[15rem] mx-auto w-full">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-50 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-950/20 to-black">
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />

        <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text pb-[22px]">
          mxdeley
        </h1>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      </div>
      <div className="my-16 animate-fade-in fixed bottom-[15rem] mx-auto w-full">
        <h1 className="text-center text-zinc-50 hover:text-zinc-300 text-sm duration-500">
          Structural Engineer
        </h1>
      </div>
    </>
  );
}
