"use client";

import * as React from "react";
import stories from "../../../content";
import Story from "./Story";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  storyId: string;
  blobs: Array<any>;
}

function StoryById(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focus = searchParams?.get("focus");
  React.useEffect(() => {
    if (pathname && focus) {
      const el = document.getElementById(focus);
      if (el) {
        router.replace(pathname, { scroll: false });

        el.scrollIntoView({ behavior: "instant", block: "center" });
        el.querySelector("a")?.focus();
      }
    }
  }, [router, pathname, focus]);

  return <Story {...props} {...stories[props.storyId]} />;
}

export default StoryById;
