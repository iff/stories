import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { color } from "@/tokens.stylex";

import { importBlob } from "@/cms";
import { Brandmark } from "@/components/Brandmark";
import Image from "next/image";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

async function Hero(props: Props) {
  const { ...rest } = props;

  const blob = await importBlob("DtmNcLbCUqzbXVfgQSowJeJZTTs9UztyYkupTzAQzbCf");

  return (
    <Root {...stylex.props(styles.root)} {...rest}>
      <div {...stylex.props(styles.image)}>
        <Image alt="" src={blob.asImage.url} fill sizes="100vw" {...stylex.props(styles.img)} />
        <div
          {...stylex.props(styles.sqip)}
          style={{
            backgroundImage: `url(${blob.asImage.placeholder.url})`,
          }}
        />
      </div>

      <div {...stylex.props(styles.box)}>
        <Brandmark size="large" />
        <div {...stylex.props(styles.lead)}>…for nothing remains of us but the vibrations we leave behind.</div>
      </div>
    </Root>
  );
}

export default Hero;

const styles = stylex.create({
  root: {
    height: ["100vh", "100svh"],
    display: "grid",
    placeItems: "center",
    justifyItems: "center",
    isolation: "isolate",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gridColumn: "1 / span 1",
    gridRow: "1 / span 1",
  },

  lead: {
    background: color.container,
    color: color.onContainer,
    textAlign: "center",

    padding: "0.7em 1em",

    fontSize: "clamp(20px, 1.5vw, 36px)",
    lineHeight: 1.3,

    maxWidth: "min(30ch, 80vw)",
    marginTop: "2em",
  },

  image: {
    position: "relative",
    zIndex: -1,
    width: "100vw",
    height: ["100vh", "100svh"],

    gridColumn: "1 / span 1",
    gridRow: "1 / span 1",

    "::after": {
      display: "block",
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "radial-gradient(circle, transparent 70%, black 200%)",
      zIndex: 2,
    },

    "@media (min-width: 720px)": {
      width: "calc(100vw - 176px)",
      height: ["calc(100vh - 140px)", "calc(100svh - 140px)"],
    },
  },

  sqip: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: "none",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",

    zIndex: 1,
  },

  img: {
    zIndex: 2,
    objectFit: "cover",
  },
});
