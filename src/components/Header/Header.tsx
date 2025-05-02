import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { color } from "@/tokens.stylex";

import { Brandmark } from "@/components/Brandmark";
import Image from "next/image";

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

  title: string;
}

function Header(props: Props) {
  const { blob, title, ...rest } = props;

  return (
    <Root {...stylex.props(styles.root)} {...rest}>
      <div {...stylex.props(styles.brandmark)}>
        <Brandmark />
      </div>

      <div {...stylex.props(styles.image)}>
        <div
          {...stylex.props(styles.sqip)}
          style={{
            backgroundImage: `url(${blob.asImage.placeholder.url})`,
          }}
        />
        <Image alt="" src={blob.asImage.url} fill sizes="100vw" {...stylex.props(styles.img)} />
      </div>

      <h1 {...stylex.props(styles.title)}>{title}</h1>
    </Root>
  );
}

export default Header;

const styles = stylex.create({
  root: {
    height: ["100vh", "100svh"],
    maxHeight: 1200,
    position: "relative",
  },

  brandmark: {
    position: "absolute",
    top: "24px",
    left: "24px",
    zIndex: 3,
  },

  image: {
    position: "relative",
    height: "100%",

    "@media (min-width: 720px)": {
      margin: "56px 0 56px 88px",
      height: "calc(100% - 112px)",
    },
  },

  img: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    objectFit: "cover",
  },

  sqip: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    transition: "opacity 0.8s ease-out 0.2s",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",

    zIndex: 1,
  },

  title: {
    position: "absolute",
    zIndex: 3,

    bottom: "24px",
    left: "24px",

    margin: 0,
    padding: "0.55em 0.7em 0.4em",

    backgroundColor: color.container,
    color: color.onContainer,

    fontSize: "clamp(32px, 3.5vw, 80px)",
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: "0.09em",

    "@media (min-width: 720px)": {
      bottom: "112px",
      left: "148px",

      minWidth: "530px",
    },
  },
});
