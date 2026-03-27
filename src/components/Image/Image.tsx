import * as stylex from "@stylexjs/stylex";
import { CompiledStyles, InlineStyles, StyleXArray } from "@stylexjs/stylex";
import NextImage from "next/image";
import Link, { LinkProps } from "next/link";
import * as React from "react";

import { color } from "@/tokens.stylex";
import { vars } from "./variables.stylex";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blob: {
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };
    };
  };

  /**
   * @def false
   */
  fill?: boolean;

  sizes?: string;

  caption?: React.ReactNode;

  /**
   * @def "below"
   */
  captionPlacement?: "below" | "overlay";

  href?: LinkProps["href"];

  sx?: StyleXArray<
    | (null | undefined | CompiledStyles)
    | boolean
    | Readonly<[CompiledStyles, InlineStyles]>
  >;
}

function Image(props: Props) {
  const {
    id,
    blob,
    fill = false,
    sizes,
    caption,
    captionPlacement = "below",
    href,
    sx,
    ...rest
  } = props;

  const image = (
    <NextImage
      {...stylex.props(
        styles.img,
        fill ? styles.cover : false,
        blob.asImage.url ? false : styles.blank,
      )}
      alt=""
      src={blob.asImage.url}
      width={fill ? undefined : blob.asImage.dimensions.width}
      height={fill ? undefined : blob.asImage.dimensions.height}
      fill={fill}
      sizes={sizes}
    />
  );

  return (
    <Root
      {...stylex.props(
        captionPlacementVariant[captionPlacement],
        styles.root,
        sx,
      )}
      {...rest}
    >
      {(() => {
        if (href) {
          return (
            <Link id={id} href={href} {...stylex.props(styles.image)}>
              {image}
            </Link>
          );
        } else {
          return (
            <div id={id} {...stylex.props(styles.image)}>
              {image}
            </div>
          );
        }
      })()}

      {caption && (
        <figcaption {...stylex.props(captionVariant[captionPlacement], styles.caption)}>
          {caption}
        </figcaption>
      )}
    </Root>
  );
}

export default Image;

const styles = stylex.create({
  root: {
    contain: "layout",
    display: "grid",
    width: "100%",
    isolation: "isolate",
    margin: "0",
  },

  image: {
    position: "relative",
    display: "block",
    color: "inherit",
    textDecoration: "none",
    outlineOffset: "2px",
    backgroundColor: "white",
  },

  img: {
    display: "block",
    maxWidth: "100%",
    height: "100%",
  },

  cover: {
    objectFit: "cover",
  },

  blank: {
    display: "none",
  },

  caption: {
    fontSize: "0.75em",
    lineHeight: "1.3",
    opacity: vars.figcaptionOpacity,
  },
});

const captionPlacementVariant = stylex.create({
  below: {},

  overlay: {
    [vars.figcaptionOpacity]: "0",
    ":hover": {
      [vars.figcaptionOpacity]: "1",
    },
    ":focus-within": {
      [vars.figcaptionOpacity]: "1",
    },
  },
});

const captionVariant = stylex.create({
  below: {
    textAlign: "left",
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
