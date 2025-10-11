import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import * as Icons from "react-feather";

import { color } from "@/tokens.stylex";

import StoryCardDateFragment from "./internal/StoryCardDateFragment";

import { vars } from "./variables.stylex";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blob: {
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder: {
        url: string;
      };
    };
  };

  story: {
    id: string;
  };

  blocks?: Array<Props["blob"]>;

  date?: Date | [Date, Date];

  title: string;

  teaser?: React.ReactNode;

  layout?: "regular" | "inverted";
}

async function StoryCard(props: Props) {
  const { story, blocks = [], blob, date, title, teaser, layout = "regular", ...rest } = props;

  return (
    <Root {...rest} {...stylex.props(styles.root, tweaks[layout])}>
      <h2 {...stylex.props(styles.title)}>{title}</h2>

      <div {...stylex.props(styles.image)}>
        <Image
          alt=""
          src={blob.asImage.url}
          fill
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={blob.asImage.placeholder.url}
        />
      </div>

      <div {...stylex.props(styles.teaser, layout === "inverted" && styles.teaserInverted)}>
        <div {...stylex.props(styles.teaserDiv)}>
          {date && (
            <div {...stylex.props(styles.date)}>
              <StoryCardDateFragment date={date} />
            </div>
          )}

          {teaser}

          <Link href={`/${story.id}`} {...stylex.props(styles.read)}>
            <Icons.ArrowRight size={"1.1em"} {...stylex.props(styles.icon)} /> Read this story
          </Link>
        </div>
      </div>

      <div
        {...stylex.props(styles.image2)}
        style={{
          justifySelf: layout === "inverted" ? "start" : "end",
          aspectRatio: "11 / 16",
        }}
      >
        <Image
          alt=""
          src={(blocks[0] ?? blob).asImage.url}
          fill
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL={(blocks[0] ?? blob).asImage.placeholder.url}
        />
      </div>
    </Root>
  );
}

export default StoryCard;

const tweaks = stylex.create({
  regular: {},

  inverted: {
    "@media (min-width: 840px) and (max-width: 1399.999px)": {
      gridTemplateColumns: "max(16px, env(safe-area-inset-left)) 1fr 1.5fr max(16px, env(safe-area-inset-right))",
      gridTemplateAreas: `
        ". title title title"
        "teaser teaser image image"
      `,
    },

    "@media (min-width: 1400px)": {
      gridTemplateAreas: `
        ". . . title title title title title title"
        "teaser teaser teaser image image image image si si"
      `,
    },
  },
});

const styles = stylex.create({
  root: {
    display: "grid",
    overflow: "hidden",

    textDecoration: "none",

    gridTemplateColumns: "max(16px, env(safe-area-inset-left)) 1fr max(16px, env(safe-area-inset-right))",

    gridTemplateAreas: `
      ". title title"
      "image image image"
      ". teaser ."
    `,

    "@media (min-width: 840px) and (max-width: 1399.999px)": {
      [vars.gap]: "24px",

      gridTemplateColumns: "max(16px, env(safe-area-inset-left)) 1.5fr 1fr max(16px, env(safe-area-inset-right))",

      gridTemplateAreas: `
        ". title title title"
        "image image teaser teaser"
      `,
    },

    "@media (min-width: 1400px)": {
      [vars.gap]: "32px",

      gridTemplateColumns: `[vs] 1fr max(16px, env(safe-area-inset-left)) [xs] minmax(0, ${vars.xcW}) [ms] ${vars.mcW} [ns] ${vars.ncW} [ne] ${vars.mcW} [me] minmax(0, ${vars.xcW}) [xe] max(16px, env(safe-area-inset-right)) 1fr [ve]`,

      gridTemplateRows: "min-content minmax(0, min-content)",

      gridTemplateAreas: `
        ". . title title title title title title title"
        "si si image image image image teaser teaser teaser"
      `,
    },
  },

  image: {
    gridArea: "image",

    position: "relative",
    height: 0,
    paddingBottom: "calc((11 / 16) * 100%)",
  },

  image2: {
    position: "relative",

    gridArea: "si",

    margin: "0 32px",

    alignSelf: "stretch",

    height: "75%",

    display: "none",
    "@media (min-width: 1400px)": {
      display: "block",
    },
  },

  title: {
    fontSize: "clamp(32px, 3vw, 60px)",
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: "0.09em",

    margin: `0 0 ${vars.gap} 0`,
    padding: "0.5em 0.7em 0.4em",

    backgroundColor: color.container,
    color: color.onContainer,

    gridArea: "title",

    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "transparent",
      borderBottom: "5px solid currentColor",
      paddingBottom: "0.2em",
    },
  },

  teaser: {
    fontSize: "clamp(20px, 1.5vw, 24px)",
    lineHeight: 1.4,

    margin: `${vars.gap} 0 0 0`,

    gridArea: "teaser",

    "@media (min-width: 840px)": {
      margin: "0 32px",
    },
  },

  teaserInverted: {
    "@media (min-width: 720px)": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },

  teaserDiv: {
    maxWidth: 530,

    "@media (min-width: 720px)": {},
  },

  date: {
    marginBottom: "16px",
    color: color.secondaryText,
    fontSize: "clamp(16px, 1.5vw, 20px)",
  },

  read: {
    position: "relative",

    fontSize: "clamp(20px, 1.5vw, 24px)",
    lineHeight: 1.4,

    display: "flex",
    marginTop: "32px",
    alignItems: "center",

    color: "inherit",
    textDecoration: "none",

    transition: "color 0.12s",

    ":hover": {
      color: color.accent,
    },

    "@media (min-width: 720px)": {
      marginTop: "56px",
    },
  },
  icon: {
    margin: "-2px 4px 0 -6px",
    color: color.accent,
  },
});
