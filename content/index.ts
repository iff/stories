import dynamic from "next/dynamic";

export default {
  "rebirth": {
    Card: dynamic(() => import(`./rebirth/card`)),
    meta: require("./rebirth/meta").default,
    Header: dynamic(() => import(`./rebirth/header`)),
    Body: dynamic(() => import(`./rebirth/body.mdx`)),
    Image: dynamic(() => import(`./rebirth/image`)),
  },
  "no-end-in-sight": {
    Card: dynamic(() => import(`./no-end-in-sight/card`)),
    meta: require("./no-end-in-sight/meta").default,
    Header: dynamic(() => import(`./no-end-in-sight/header`)),
    Body: dynamic(() => import(`./no-end-in-sight/body.mdx`)),
    Image: dynamic(() => import(`./no-end-in-sight/image`)),
  },
  "shivering-sense": {
    Card: dynamic(() => import(`./shivering-sense/card`)),
    meta: require("./shivering-sense/meta").default,
    Header: dynamic(() => import(`./shivering-sense/header`)),
    Body: dynamic(() => import(`./shivering-sense/body.mdx`)),
    Image: dynamic(() => import(`./shivering-sense/image`)),
  },
  "blouson-noir": {
    Card: dynamic(() => import(`./blouson-noir/card`)),
    meta: require("./blouson-noir/meta").default,
    Header: dynamic(() => import(`./blouson-noir/header`)),
    Body: dynamic(() => import(`./blouson-noir/body.mdx`)),
    Image: dynamic(() => import(`./blouson-noir/image`)),
  },
  "where-i-was-meant-to-be": {
    Card: dynamic(() => import(`./where-i-was-meant-to-be/card`)),
    meta: require("./where-i-was-meant-to-be/meta").default,
    Header: dynamic(() => import(`./where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`./where-i-was-meant-to-be/body.mdx`)),
    Image: dynamic(() => import(`./where-i-was-meant-to-be/image`)),
  },
  "one-more-rush": {
    Card: dynamic(() => import(`./one-more-rush/card`)),
    meta: require("./one-more-rush/meta").default,
    Header: dynamic(() => import(`./one-more-rush/header`)),
    Body: dynamic(() => import(`./one-more-rush/body.mdx`)),
    Image: dynamic(() => import(`./one-more-rush/image`)),
  },
  "dreamers-wake": {
    Card: dynamic(() => import(`./dreamers-wake/card`)),
    meta: require("./dreamers-wake/meta").default,
    Header: dynamic(() => import(`./dreamers-wake/header`)),
    Body: dynamic(() => import(`./dreamers-wake/body.mdx`)),
    Image: dynamic(() => import(`./dreamers-wake/image`)),
  },
} as const;
