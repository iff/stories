"use client";

import * as React from "react";

function StoryById() {
  React.useEffect(() => {
    const { pathname, search, hash } = window.location;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        window.history.replaceState(null, "", pathname + search);
        el.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }
  }, []);

  return null;
}

export default StoryById;
