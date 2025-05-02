import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { color } from "@/tokens.stylex";

import { vars } from "../variables.stylex";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figcaption";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  captionPlacement?: "below" | "overlay";
}

function Caption(props: Props) {
  const { captionPlacement = "below", ...rest } = props;

  return <Root {...stylex.props(captionPlacementVariant[captionPlacement], styles.root)} {...rest} />;
}

export default Caption;

const styles = stylex.create({
  root: {
    fontSize: "0.75em",
    lineHeight: "1.3",
    opacity: vars.figcaptionOpacity,
  },
});

const captionPlacementVariant = stylex.create({
  below: {
    textAlign: "center",
    margin: "8px 0",

    color: color.secondaryText,
  },

  overlay: {
    position: "absolute",
    margin: "0",
    left: "2px",
    right: "2px",
    bottom: "2px",
    backgroundColor: color.container,
    color: color.onContainer,
    padding: "8px 10px 6px",
    textAlign: "left",
    pointerEvents: "none",
    transition: "opacity 0.4s",
  },
});
