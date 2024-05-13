"use client"; // 👈 Don't forget your client directive

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const env = process.env.NODE_ENV;
    if (env !== "production") return;

    load("PHWVZBTJ", {
      auto: false,
      includedDomains: [
        "https://mxdeley.vercel.app/",
        "https://www.mxdeley.com/",
      ],
    });
  }, []);

  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

// We use this in our main layout.tsx or jsx file
export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
