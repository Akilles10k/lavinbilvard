"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LIGHT_PAGES = ["/om-oss", "/tjanster", "/prislista", "/fotogalleri", "/kontakt"];

export default function BodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const light = LIGHT_PAGES.some((page) => path === page || path.startsWith(`${page}/`));
    document.body.classList.toggle("page-light", light);
    return () => document.body.classList.remove("page-light");
  }, [pathname]);

  return null;
}
