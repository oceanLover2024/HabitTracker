"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
export default function NProgressProvider() {
  const pathname = usePathname();
  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
