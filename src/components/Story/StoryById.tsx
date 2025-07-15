"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

function StoryById() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focus = searchParams?.get("focus");
  React.useEffect(() => {
    let rafHandle: undefined | number;

    if (pathname && focus) {
      const go = () => {
        rafHandle = undefined;

        const el = document.getElementById(focus);
        if (el) {
          router.replace(pathname, { scroll: false });

          el.scrollIntoView({ behavior: "instant", block: "center" });
          el.querySelector("a")?.focus();
        } else {
          rafHandle = requestAnimationFrame(go);
        }
      };

      go();
    }

    return () => {
      if (rafHandle !== undefined) {
        cancelAnimationFrame(rafHandle);
      }
    };
  }, [router, pathname, focus]);

  return null;
}

export default StoryById;
