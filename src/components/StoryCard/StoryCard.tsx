import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { defineMessage } from "@formatjs/intl";
import Image from "next/legacy/image";
import Link from "next/link";
import * as Icons from "react-feather";
import imageLoader from "src/imageLoader";
import { getIntl } from "src/intl";

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
  const intl = await getIntl("en");

  const { story, blocks = [], blob, date, title, teaser, layout = "regular", ...rest } = props;

  const loaded = false;

  return (
    <Root {...rest} {...stylex.props(styles.root, tweaks[layout])}>
      <h2 {...stylex.props(styles.title)}>{title}</h2>

      <div {...stylex.props(styles.image)}>
        <Image
          alt=""
          src={blob.asImage.url}
          loader={imageLoader}
          layout="fill"
          objectFit="cover"
          style={{ zIndex: 2 }}
        />
        <div
          {...stylex.props(styles.sqip)}
          style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${blob.asImage.placeholder.url})` }}
        />
      </div>

      <div {...stylex.props(styles.teaser, layout === "inverted" && styles.teaserInverted)}>
        <div {...stylex.props(styles.teaserDiv)}>
          {date && (
            <div {...stylex.props(styles.date)}>
              {(() => {
                if (Array.isArray(date)) {
                  const [from, to] = date;

                  if (from.getUTCFullYear() === to.getUTCFullYear()) {
                    if (from.getUTCMonth() === to.getUTCMonth()) {
                      return intl.formatMessage(
                        defineMessage({
                          id: "hQR6Zk3",
                          defaultMessage: "{month} {from} – {to}, {year}",
                        }),
                        {
                          month: intl.formatDate(from, { month: "long" }),
                          from: intl.formatDate(from, { day: "numeric" }),
                          to: intl.formatDate(from, { day: "numeric" }),
                          year: intl.formatDate(to, { year: "numeric" }),
                        },
                      );
                    } else {
                      return intl.formatMessage(
                        defineMessage({
                          id: "xo4t6Jj",
                          defaultMessage: "{from} – {to}",
                        }),
                        {
                          from: intl.formatDate(from, { month: "long", day: "numeric" }),
                          to: intl.formatDate(to, { month: "long", day: "numeric", year: "numeric" }),
                        },
                      );
                    }
                  } else {
                    return intl.formatMessage(
                      defineMessage({
                        id: "pakxPSK",
                        defaultMessage: "{from} – {to}",
                      }),
                      {
                        from: intl.formatDate(from, { month: "long", day: "numeric", year: "numeric" }),
                        to: intl.formatDate(to, { month: "long", day: "numeric", year: "numeric" }),
                      },
                    );
                  }
                } else {
                  return intl.formatDate(date);
                }
              })()}
            </div>
          )}

          {teaser}

          <Link href={`/${story.id}`} {...stylex.props(styles.read)}>
            <Icons.ArrowRight size={"1.1em"} style={{ margin: "0 8px 0 0" }} /> read this story
          </Link>
        </div>
      </div>

      <div {...stylex.props(styles.image2)}>
        <Image
          alt=""
          src={(blocks[0] ?? blob).asImage.url}
          loader={imageLoader}
          {...(blocks[0] ?? blob).asImage.dimensions}
          objectFit="cover"
          style={{ zIndex: 2 }}
        />
        <div
          {...stylex.props(styles.sqip)}
          style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${(blocks[0] ?? blob).asImage.placeholder.url})` }}
        />
      </div>
    </Root>
  );
}

export default StoryCard;

const tweaks = stylex.create({
  regular: {},

  inverted: {
    "@media (min-width: 720px)": {
      gridTemplateAreas: `
        ". . . title title title title title title"
        "teaser teaser teaser image image image image . ."
        "si si si image image image image . ."
      `,
    },
  },
});

const styles = stylex.create({
  root: {
    display: "grid",

    textDecoration: "none",

    gridTemplateColumns:
      "[vs] max(16px, env(safe-area-inset-left)) [xs] 0 [ms] 0 [ns] 1fr [ne] 0 [me] 0 [xe] max(16px, env(safe-area-inset-right)) [ve]",

    gridTemplateAreas: `
      ". title title title title title title"
      "image image image image image image image"
      ". teaser teaser teaser teaser teaser ."
    `,

    "@media (min-width: 720px)": {
      [vars.gap]: "32px",

      gridTemplateColumns: `[vs] 1fr max(16px, env(safe-area-inset-left)) [xs] minmax(0, ${vars.xcW}) [ms] ${vars.mcW} [ns] ${vars.ncW} [ne] ${vars.mcW} [me] minmax(0, ${vars.xcW}) [xe] max(16px, env(safe-area-inset-right)) 1fr [ve]`,

      gridTemplateRows: "min-content minmax(0, min-content) 1fr",

      gridTemplateAreas: `
        ". . . . title title title title title"
        ". . image image image image teaser teaser teaser"
        ". . image image image image si si si"
      `,
    },
  },

  sqip: {
    position: "absolute",
    inset: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: "none",
    transition: "opacity 0.8s ease-out 0.5s",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",

    zIndex: 1,
  },

  image: {
    position: "relative",
    height: 0,
    paddingBottom: "100%",

    gridArea: "image",

    "@media (min-width: 720px)": {
      paddingBottom: "calc((11 / 16) * 100%)",
    },
  },

  image2: {
    position: "relative",

    margin: "32px",

    gridArea: "si",

    display: "none",
    "@media (min-width: 720px)": {
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

    background: "#18191b",
    color: "rgba(255 255 255 / 0.96)",

    gridArea: "title",

    "@media (prefers-color-scheme: dark)": {
      background: "transparent",
      borderBottom: "5px solid currentColor",
      paddingBottom: "0.2em",
    },
  },

  teaser: {
    fontSize: "clamp(20px, 1.5vw, 24px)",
    lineHeight: 1.4,

    margin: `${vars.gap} 0 0 0`,

    gridArea: "teaser",

    "@media (min-width: 720px)": {
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
    "@media (min-width: 720px)": {
      maxWidth: 530,
    },
  },

  date: {
    marginBottom: "16px",
    opacity: 0.6,
    fontSize: "clamp(16px, 1.5vw, 20px)",
  },

  read: {
    fontSize: "clamp(16px, 1.5vw, 20px)",
    display: "flex",
    marginTop: "56px",
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 6,

    color: "inherit",
    textDecoration: "none",

    transition: "opacity 0.2s",

    ":hover": {
      opacity: 1,
    },
  },
});
