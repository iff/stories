"use client";

import * as React from "react";
import Story from "./Story";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props extends React.ComponentPropsWithoutRef<typeof Story> {
  blobs: Array<any>;
}

function StoryById(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focus = searchParams?.get("focus");
  React.useEffect(() => {
    let rafHandle: undefined | number = undefined;

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

  return <Story {...props} />;
}

export default StoryById;
