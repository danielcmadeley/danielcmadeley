"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="py-6">
      <nav className="text-sm flex items-center gap-6">
        <Link
          href={"/"}
          className={isActive("/") ? "text-zinc-200" : "text-zinc-500"}
        >
          Home
        </Link>
        <Link
          href={"/about"}
          className={isActive("/about") ? "text-zinc-200" : "text-zinc-500"}
        >
          About
        </Link>
        <Link
          href={"/projects"}
          className={isActive("/projects") ? "text-zinc-200" : "text-zinc-500"}
        >
          Projects
        </Link>
        {/* External links do not participate in internal navigation state */}
        <Link
          href="https://mxdeley.beehiiv.com/subscribe"
          className="text-zinc-500"
        >
          Newsletter
        </Link>
      </nav>
    </header>
  );
};

export default Header;
