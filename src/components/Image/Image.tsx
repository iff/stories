import * as stylex from "@stylexjs/stylex";
import { CompiledStyles, InlineStyles, StyleXArray } from "@stylexjs/stylex";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import * as React from "react";

import NextImage from "next/image";
import Link, { LinkProps } from "next/link";
import Caption from "./internal/Caption";

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

      placeholder?: {
        url: string;
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

  /*
   * The 'span' and 'aspectRatio' props are not actually used by this component.
   * But they are sometimes passed to the component when it's rendered inside a
   * <Group>, and without adding them to the props here TypeScript would
   * complain.
   *
   * XXX: There has to be a better way to support this.
   */
  span?: number | number[];
  aspectRatio?: number;

  sx?: StyleXArray<(null | undefined | CompiledStyles) | boolean | Readonly<[CompiledStyles, InlineStyles]>>;
}

function Image(props: Props) {
  const { blob, fill = false, sizes, caption, captionPlacement = "below", href, sx, ...rest } = props;

  const image = (
    <NextImage
      {...stylex.props(styles.img, fill ? styles.cover : false, blob.asImage.url ? false : styles.blank)}
      alt=""
      src={blob.asImage.url}
      width={fill ? undefined : blob.asImage.dimensions.width}
      height={fill ? undefined : blob.asImage.dimensions.height}
      fill={fill}
      sizes={sizes}
      placeholder={blob.asImage.placeholder?.url as PlaceholderValue}
    />
  );

  return (
    <Root {...stylex.props(captionPlacementVariant[captionPlacement], styles.root, sx)} {...rest}>
      {(() => {
        if (href) {
          return (
            <Link href={href} {...stylex.props(styles.image)}>
              {image}
            </Link>
          );
        } else {
          return <div {...stylex.props(styles.image)}>{image}</div>;
        }
      })()}

      {caption && <Caption captionPlacement={captionPlacement}>{caption}</Caption>}
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
    backgroundColor: "black",
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
